var express = require('express');
var router = express.Router();
const db = require('../mysql')
const { sandEmail } = require('./../utils/email');
const multer  = require('multer')
const { token_verification } = require("./../middleware/index")
const { createToken } = require('./../utils/jwt');
const email = require('./../utils/email');

let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, './public/images/')
  },
  filename (req, file, cb) {
    let exts = file.originalname.split('.')
    let ext = file.originalname.split('.')[exts.length - 1]
    cb(null, `${ req.session.email }.${ ext }`)
  }
})
let upload = multer({
  storage
})

/* GET users listing. */
router.get('/token', (req, res) => {
  if ( req.session.token ) { return res.send({code: '200', data: req.session.token}) }
  let token = createToken({ name: 'xiaye', saying: 'Hello,welcome to my blog'})
  req.session.token = token
  res.send({code: '200', data: token})
})

// 注册发送邮箱验证码
router.post('/register/email', async (req, res) => {
  if ( req.body.email ) {
    // 查询邮箱
    let result = await db.select('*').from('user').where('email', req.body.email).queryRow().catch(err => {
      console.log( err )
      res.send({code: 0, msg: '系统繁忙'})
      return
    })
    if ( result != undefined ) {
      res.send({code: 0, msg: '该邮箱已被注册'})
      return
    } 
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
router.post('/register', async (req, res) => {
  if ( !req.body.email ) { return res.send({code: '000010', msg: '缺少参数 email'}) }
  if ( !req.body.password ) { return res.send({code: '000011', msg: '缺少参数 password'}) }
  if ( !req.body.emailms ) { return res.send({code: '000012', msg: '缺少参数 emailms'}) }
  if ( req.body.email && req.body.password && req.body.emailms ) {
    if ( req.body.emailms != req.session.code ) {
      res.send({code: 0, msg: '验证码错误'})
    } else {
      // 插入数据
      await db.insert('user').column('email', req.body.email).column('password', req.body.password).execute().catch(err => {
        req.session.email = req.body.email
        req.session.code = random_code
        res.send({ code: 200, data })
      })
      res.send({code: 200, msg: '注册成功'})
    }
  }
})

// 登录
router.post('/login', token_verification, async (req, res) => {
  const { email, password, token } = req.body
  if ( !email ) { return res.send({ code: '000010', msg: '请输入邮箱' }) }
  if ( !password ) { return res.send({ code: '000011', msg: '请输入密码' }) }
  req.session.email = email
  req.session.token = token
  let data = await db.select('*').from('user').where('email', email).queryRow().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  if ( data == undefined ) {
    res.send({code: 0, msg: '您还未注册'})
  } else {
    if ( data.password != password ) {
      res.send({code: 0, msg: '密码错误'})
    } else {
      res.send({code: 200, data})
    }
  }
})

// 用户信息
router.get('/info', async (req, res) => {
  if ( !req.query.token || req.query.token != req.session.token ) { return res.send({ code: 200, data: {}}) }
  let data = await db.select('*').from('user').where('email', req.session.email).queryRow().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200, data})
})

// 退出登录
router.get('/logout', (req, res) => {
  req.session = null
  res.send({code: 200, msg: '退出成功'})
})

// 上传头像
router.post('/upload/heads', upload.single('head_img'), async (req, res) => {
  if ( !req.session.token ) { return res.send({ code: '000013', msg: '无效的 token'}) }
  let type = false
  let exts = req.file.filename.split('.')
  let temp = ['jpg','jpeg','png','gif']
  temp.forEach(item => {
    if ( req.file.filename.split('.')[exts.length - 1] == item ) { type = true }
  })
  if ( !type ) { res.send({ code: '000015', msg: '图片格式不对'})}
  if ( req.file.size / 1024 > 500 ) { return res.send({ code: '000014', msg: '图片不能大于 500kb'}) }
  // 修改图片
  let result = await db.update('user').column('head_img', `/images/${ req.session.email }.${ req.file.filename.split('.')[exts.length - 1] }`).where('email', req.session.email).execute().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  // 发送用户信息
  let data = await db.select('*').from('user').where('email', req.session.email).queryRow().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200, data})
})

// 更新用户信息
router.post('/update', token_verification, async (req, res) => {
  const { name, saying, qq, weibo, git, bilibili } = req.body
  // 修改用户信息
  await db.update('user').column('name', name).column('saying', saying).column('qq', qq).column('git', git).column('weibo', weibo).column('bilibili', bilibili).where('email', req.session.email).execute().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  // 发送用户信息
  let data = await db.select('*').from('user').where('email', req.session.email).queryRow().catch(err => {
    console.log( err )
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200, data})
})

module.exports = router;
