var express = require('express');
var router = express.Router();
const pool = require('./../mysql/pool')
const { Timestamp_To_YYYY_MM_DD_HH_MM_SS } = require('./../utils/time')
const { token_verification } = require('./../middleware/index')

router.post('/add', token_verification, (req, res) => {
    const { title,article_class,article_tags,skill_tag,content,html_content } = req.body
    if ( !title || !article_class || !article_tags || !skill_tag || !content || !html_content ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let start_time = Timestamp_To_YYYY_MM_DD_HH_MM_SS( new Date() )
    pool.query(`insert into article(title,article_class,article_tags,skill_tag,content,html_content,publish_time,update_time) value('${ title }','${ article_class }','${ article_tags }','${ skill_tag }','${ content }','${ html_content }','${ start_time }','${ start_time }')`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200, data: 'ok'})
        }
    })
})

router.get('/list', token_verification, (req, res) => {
    const { article_class } = req.query
    if ( article_class ) {
        pool.query(`select * from article where article_class = '${ article_class }'`, (err, data) => {
            if ( err ) {
                console.log( err )
                res.send({ code: '000021', msg: '系统繁忙'})
            } else {
                res.send({ code: 200, data})
            }
        })
    } else {
        pool.query('select * from article', (err, data) => {
            if ( err ) {
                console.log( err )
                res.send({ code: '000021', msg: '系统繁忙'})
            } else {
                res.send({ code: 200, data})
            }
        })
    }
})

router.get('/del', token_verification, (req, res) => {
    const { id } = req.query
    if ( !id ) { return res.send({ code: '000020', msg: '缺少参数'})}
    pool.query(`delete from article where id = '${ id }'`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200})
        }
    })
})

router.get('/search', (req, res) => {
    // 1-id 2-article_class
    const { type,id,article_class } = req.query
    if ( !type ) { return res.send({ code: '000020', msg: '缺少参数'})}
    if ( type == 1 ) {
        pool.query(`select * from article where id = '${ id }'`, (err, data) => {
            if ( err ) {
                console.log( err )
                res.send({ code: '000021', msg: '系统繁忙'})
            } else {
                res.send({ code: 200, data: data[0]})
            }
        })
    } else if ( type == 2 ) {
        pool.query(`select * from article where article_class = '${ article_class }' order by update_time desc limit 6`, (err, data) => {
            if ( err ) {
                console.log( err )
                res.send({ code: '000021', msg: '系统繁忙'})
            } else {
                res.send({ code: 200, data: data})
            }
        })
    }
})

router.post('/update', token_verification, (req, res) => {
    const { id,title,article_class,article_tags,skill_tag,content,html_content } = req.body
    if ( !id,!title || !article_class || !article_tags || !skill_tag || !content || !html_content ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let update_time = Timestamp_To_YYYY_MM_DD_HH_MM_SS( new Date() )
    pool.query(`update article set title = '${ title }',article_class = '${ article_class }',article_tags= '${ article_tags }',skill_tag = '${ skill_tag }',content = '${ content }',html_content = '${ html_content }',update_time = '${ update_time }' where id = '${ id }'`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200, data: 'ok'})
        } 
    })
})

module.exports = router;