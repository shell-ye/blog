var express = require('express');
var router = express.Router();
const pool = require('./../mysql/pool')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article',(req, res) => {
  pool.query('select * from article where id = 1',(err, data) => {
    if ( err ) {
      console.log( err )
    } else {
      res.send({ code: 200, data: data[0]})
    }
  })
})

// 首页信息
router.get('/init', async (req, res) => {
  let webInit = {
    article_count: 0,
    article_likes_count: 0,
    views_count: 0,
    tell: '暂无公告',
    create_time: ''
  }
  // 文章数目
  pool.query('select count(*) from article', (err, data) => {
    if ( err ) {
      console.log( err )
      res.send({code: 100000, msg: '系统繁忙'})
    } else {
      webInit.article_count = data[0]['count(*)']
      // 点赞文章
      pool.query('select count(*) from article_likes', (err, data) => {
        if ( err ) {
          console.log( err )
          res.send({code: 100000, msg: '系统繁忙'})
        } else {
          webInit.article_likes_count = data[0]['count(*)']
          pool.query('select views,tell,create_time from webside', (err, data) => {
            if ( err ) {
              console.log( err )
              res.send({code: 100000, msg: '系统繁忙'})
            } else {
              webInit.views_count = data[0]['views']
              webInit.tell = data[0]['tell']
              webInit.create_time = data[0]['create_time']
              res.send({code: 200, data: webInit})
            }
          })
        }
      })
    }
  })
  let prop = await pool.query('select * from article', (err, data) => {
    // console.log('data---------------------------------------')
    // console.log(data)
    // console.log('data---------------------------------------')
  })
  console.log('------------------------------')
  console.log(prop)
  console.log('------------------------------')
})

// 增加浏览量
router.get('/views', (req, res) => {
  pool.query('update webside set views = views + 1', (err) => {
    if ( err ) {
      console.log( err )
    } else {
      res.send({code: 200})
    }
  })
})

module.exports = router;
