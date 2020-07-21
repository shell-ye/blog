var express = require('express');
var router = express.Router();
const pool = require('./../mysql/pool')
const { sandEmail } = require('./../utils/email');
const { Token } = require('./../utils/token');
const multer  = require('multer')
const { token_verification } = require('./../middleware/index')

let storage = multer.diskStorage({
  destination (req, res, cb) {
    cb(null, './public/images/')
  },
  filename (req, res, cb) {
    let exts = res.originalname.split('.')
    let ext = res.originalname.split('.')[exts.length - 1]
    cb(null, `${ req.session.email }.${ ext }`)
  }
})
let upload = multer({
  storage
})

/* GET users listing. */
router.get('/token', (req, res) => {
  if ( req.session.token ) { return res.send({code: '200', data: req.session.token}) }
  let token = Token.createToken()
  req.session.token = token
  res.send({code: '200', data: token})
})

// 注册发送邮箱验证码
router.post('/register/email', (req, res) => {
  if ( req.body.email ) {
    let random_code = parseInt( Math.random() * 1000000 ).toString()
    sandEmail( req.body.email,random_code ).then( data => {
      req.session.email = req.body.email
      req.session.code = random_code
      res.send({ code: 200, data })
    }).catch(err => {
      res.send({code: '000001', msg: '验证码发送失败'})
    })
  } else {
    res.send({ code: '000010', msg: '缺少参数 email'})
  }
})

// 注册
router.post('/register', (req, res) => {
  if ( !req.body.email ) { return res.send({code: '000010', msg: '缺少参数 email'}) }
  if ( !req.body.password ) { return res.send({code: '000011', msg: '缺少参数 password'}) }
  if ( !req.body.emailms ) { return res.send({code: '000012', msg: '缺少参数 emailms'}) }
  if ( req.body.email && req.body.password && req.body.emailms ) {
    pool.query(`select * from user where email = '${ req.body.email }'`,(err, data) => {
      if ( err ) {
        res.send({ code: '000003', msg: '内部错误' })
      } else {
        if ( data.length ) {
          res.send({ code: '000004', msg: '该邮箱已被注册' })
        } else {
          if ( req.session.code == req.body.emailms ) {
            pool.query(`insert into user(email,password) value('${ req.body.email }','${ req.body.password }')`,(err) => {
              if ( err ) {
                res.send({ code: '000002', msg: '内部错误' })
              } else {
                res.send({ code: '200', data: '注册成功' })
              }
            })
          } else {
            res.send({ code: '000005', msg: '验证码错误或已失效' })
          }
        }
      }
    })
  }
})

// 登录
router.post('/login', (req, res) => {
  const { email,password,token } = req.body
  if ( !email ) { return res.send({ code: '000010', msg: '请输入邮箱' }) }
  if ( !password ) { return res.send({ code: '000011', msg: '请输入密码' }) }
  if ( !token ) { return res.send({ code: '000013', msg: '无效的 token', token: req.session.token }) }
  req.session.email = email
  req.session.token = token
  pool.query(`select * from user where email = '${ email }'`, (err, data) => {
    if ( err ) {
      res.send({ code: '000003', msg: '内部错误' })
    } else if ( !data.length ) {
      res.send({ code: '000006', msg: '该邮箱暂未被注册' })
    } else {
      if ( data[0].password != password ) {
        res.send({ code: '000007', msg: '密码错误' })
      } else {
        if ( data && data[0] ) { delete data[0].password}
        res.send({ code: 200, data: data[0] })
      }
    }
  })
})

// 用户信息
router.get('/info', (req, res) => {
  const { token } = req.query
  if ( !token || token != req.session.token ) { return res.send({ code: '200', data:{} }) }
  pool.query(`select * from user where email = '${ req.session.email }'`, (err, data) => {
    if ( err ) {
      console.log( err )
      res.send({ code: '000003', msg: '内部错误' })
    } else {
      if ( data && data[0] ) { delete data[0].password}
      res.send({ code: 200, data: data[0] })
    }
  })
})

// 退出登录
router.get('/logout', (req, res) => {
  req.session = null
  res.send({code: 200, msg: '退出成功'})
})

// 上传头像
router.post('/upload/heads', upload.single('head_img'), (req, res) => {
  if ( !req.session.token ) { return res.send({ code: '000013', msg: '无效的 token'}) }
  let type = false
  let exts = req.file.filename.split('.')
  let temp = ['jpg','jpeg','png','gif']
  temp.forEach(item => {
    if ( req.file.filename.split('.')[exts.length - 1] == item ) { type = true }
  })
  if ( !type ) { res.send({ code: '000015', msg: '图片格式不对'})}
  if ( req.file.size / 1024 > 500 ) { return res.send({ code: '000014', msg: '图片不能大于 500kb'}) }
  pool.query(`update user set head_img = "/images/${ req.session.email }.${ req.file.filename.split('.')[exts.length - 1] }" where email = "${ req.session.email }"`, (err, data) => {
    if ( err ) {
      res.send({ code: '000016', msg: '系统繁忙'})
    } else {
      pool.query(`select * from user where email = '${ req.session.email }'`, (err, data) => {
        if ( err ) {
          res.send({ code: '000017', msg: '系统繁忙'})
        } else {
          if ( data && data[0] ) { delete data[0].password}
          res.send({ code: 200, data: data[0]})
        }
      })
    }
  })
})

// 更新用户信息
router.post('/update', token_verification, (req, res) => {
  const { name,saying,qq,weibo,git,bilibili } = req.body
  pool.query(`update user set name = '${ name }',saying = '${ saying }',qq = '${ qq }',git = '${ git }',weibo = '${ weibo }',bilibili = '${ bilibili }' where email = '${ req.session.email }'`, (err, data) => {
    if ( err ) {
      res.send({ code: '000018', msg: '系统繁忙'})
    } else {
      pool.query(`select * from user where email = '${ req.session.email }'`, (err, data) => {
        if ( err ) {
          res.send({ code: '000019', msg: '系统繁忙'})
        } else {
          if ( data && data[0] ) { delete data[0].password}
          res.send({ code: 200, data: data[0]})
        }
      })
    }
  })
})

module.exports = router;
