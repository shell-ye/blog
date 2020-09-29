var express = require('express');
var router = express.Router();
const db = require('../mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 首页信息
router.get('/init', async (req, res) => {
  // 文章数量
  let article_count = await db.select('count(*)').from('article').queryValue().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  // 文章点赞数
  let article_likes_count = await db.select('count(likes_count)').from('article').queryValue().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  // 网站信息
  let webside = await db.select('views, tell, create_time').from('webside').queryRow().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })

  // 分类文章数量
  let node_num = await db.select('count(*)').from('article').where('article_tags', 'Node', 'like').queryValue()
  let vue_num = await db.select('count(*)').from('article').where('article_tags', 'Vue', 'like').queryValue()
  let windows_num = await db.select('count(*)').from('article').where('article_tags', 'Windows', 'like').queryValue()
  let git_num = await db.select('count(*)').from('article').where('article_tags', 'Git', 'like').queryValue()
  let html_num = await db.select('count(*)').from('article').where('article_tags', 'HTML+CSS', 'like').queryValue()
  let js_num = await db.select('count(*)').from('article').where('article_tags', 'Javascript', 'like').queryValue()
  let axios_num = await db.select('count(*)').from('article').where('article_tags', 'Axios', 'like').queryValue()
  let element_ui_num = await db.select('count(*)').from('article').where('article_tags', 'ElementUI', 'like').queryValue()
  let webInit = {
    article_count,
    article_likes_count,
    views_count: webside.views,
    tell: webside.tell,
    create_time: webside.create_time,
    tags_count: {
      'HTML+CSS': html_num,
      Javascript: js_num,
      Node: node_num,
      Vue: vue_num,
      Axios: axios_num,
      Git: git_num,
      Windows: windows_num,
      ElementUI: element_ui_num
    }
  }
  res.send({code: 200, data: webInit})
})

// 增加浏览量
router.get('/views', async (req, res) => {
  let result = await db.update('webside').column('views', db.literal('views + 1')).where('id', 1).execute().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200})
  if ( req.session && req.session.email ) {
    db.update('user').column('looked', db.literal('looked + 1')).where('email', req.session && req.session.email).execute().catch(err => {
      console.log( err )
    })
  }
})

module.exports = router;
