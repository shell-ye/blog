var express = require('express');
var router = express.Router();
const db = require('../mysql');
const { token_verification, checkAdmin } = require("./../middleware/index")
const multer  = require('multer');

let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, './public/images/friendLinkImg')
  },
  filename (req, file, cb) {
    let name = file.originalname.split('.')[0]
    let ext = file.originalname.split('.')[1]
    req.session.friend_img_name = name + '.' + ext
    cb(null, `${ name }.${ ext }`)
  }
})
let upload = multer({
  storage
})

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
  let article_likes_count = await db.select('sum(likes_count)').from('article').queryValue().catch(err => {
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
  // 增加浏览量
  db.update('webside').column('views', db.literal('views + 1')).where('id', 1).execute()
  if ( req.session && req.session.email ) {
    db.update('user').column('looked', db.literal('looked + 1')).where('email', req.session && req.session.email).execute()
  }
})

// 友情链接
router.get('/friend/links', async (req, res) => {
  let data = await db.select('*').from('friend_links').queryList().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200, data})
})

// 添加友情链接
router.post('/friend/add', token_verification, checkAdmin, async (req, res) => {
  const { classes, name, remarks, href } = req.body
  if ( !classes || !name || !remarks || !href ) {
    res.send({code: 0, msg: '缺少参数'})
    return
  }
  await db.insert('friend_links').column('class', classes).column('name', name).column('remarks', remarks).column('href', href).column('head_img', req.session.friend_img_name).execute().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200})
})

// 添加友情链接图片
router.post('/friend/add/head', checkAdmin, upload.single('head_img'), (req, res) => {
  let name = req.file.originalname.split('.')[0]
  let ext = req.file.originalname.split('.')[1]
  req.session.friend_img_name = name + '.' + ext
  res.send({code: 200})
})

// 删除友链
router.get('/friend/del', checkAdmin, async (req, res) => {
  const { id } = req.query
  await db.delete('friend_links').where('id', id).execute().catch(err => {
    console.log(err)
    res.send({code: 0, msg: '系统繁忙'})
    return
  })
  res.send({code: 200})
})

module.exports = router;
