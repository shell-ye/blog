var express = require('express');
const { request, response } = require('express');
var router = express.Router();
const pool = require('./../mysql/pool')
// const sendEmail = require('./../utils/email')

let data = {
  code: {}, // 储存用户名与注册验证码
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册发送邮箱验证码
// router.post('/register/email', (req, res) => {
//   if ( req.body.email ) {
//     let random_code = parseInt( Math.random() * 1000000 )
//     data.code[req.body.email] = random_code
//     sendEmail( req.body.email,random_code ).then( data => {
//       res.send({ code: 200, data })
//     }).catch(err => {
//       res.send({code: 000001, data: err})
//     })
//   } else {
//     res.send({ code: 000002, msg: '缺少参数 - email'})
//   }
// })

// 注册
router.post('/register', (req, res) => {
  if ( req.body.email && req.body.password ) {
    pool.query(`select * from user where email = '${ req.body.email }'`,(err, data) => {
      if ( err ) {
        console.log( err )
        res.send({ code: '000003', msg: '内部错误' })
      } else {
        if ( data.length ) {
          res.send({ code: '000004', msg: '该邮箱已被注册' })
        } else {
          pool.query(`insert into user(email,password) value('${ req.body.email }','${ req.body.password }')`,(err) => {
            if ( err ) {
              res.send({ code: '000002', msg: err })
            } else {
              res.send({ code: '200', data: '注册成功' })
            }
          })
        }
      }
    })
  } else {
    res.send({code: 000001, msg: '缺少参数'})
  }
})

router.post('/login', (req, res) => {
  const { email,password } = req.body
  if ( !email ) { return res.send({ code: '000005', msg: '请输入邮箱' }) }
  if ( !password ) { return res.send({ code: '000005', msg: '密码' }) }
  pool.query(`select * from user where email = '${ email }'`, (err, data) => {
    if ( err ) {
      res.send({ code: '000003', msg: '内部错误' })
    } else if ( !data.length ) {
      res.send({ code: '000006', msg: '该邮箱暂未被注册' })
    } else {
      if ( data[0].password != password ) {
        res.send({ code: '000007', msg: '密码错误' })
      } else {
        res.send({ code: 200, data: data[0] })
      }
    }
  })
})

module.exports = router;
