var express = require('express');
var router = express.Router();
const marked = require('marked')
const pool = require('./../mysql/pool')
const { Timestamp_To_YYYY_MM_DD_HH_MM_SS } = require('./../utils/time')
const { token_verification } = require('./../middleware/index')

router.post('/add', token_verification, (req, res) => {
    const { title,article_tags,skill_tag,content,html_content } = req.body
    if ( !title || !article_tags || !skill_tag || !content || !html_content ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let start_time = Timestamp_To_YYYY_MM_DD_HH_MM_SS( new Date() )
    // let html = marked(content.toString());
    pool.query(`insert into article(title,article_tags,skill_tag,content,html_content,publish_time,update_time) value('${ title }','${ article_tags }','${ skill_tag }','${ content }','${ html_content }','${ start_time }','${ start_time }')`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200, data: 'ok'})
        }
    })
})

router.get('/list', token_verification, (req, res) => {
    let query = ''
    let count_query = ''
    let count = 0
    const { type, pages, page_count, article_tags } = req.query
    if ( !type || !pages || !page_count ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    if ( type == 1 ) {
        count_query = 'select count(*) from article'
    } else if ( type == 2 ) {
        count_query = `select count(*) from article where article_tags like '%${ article_tags }%'`
    }
    pool.query(count_query, (err, data) => {
        if ( err ) {
            console.log( err )
            return res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            count = data[0]['count(*)']
        }
    })
    if ( type == 1 ) {
        query = `select * from article order by update_time desc limit ${ ( pages - 1 ) * page_count },${ page_count }`
    } else if ( type == 2 ) {
        query = `select * from article where article_tags like '%${ article_tags }%' order by update_time desc limit ${ ( pages - 1 ) * page_count },${ page_count }`
    }
    pool.query(query, (err, datas) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200, data: datas, pages_info: { count, pages}})
        }
    })
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
    // 1-id 2-article_tags
    const { type, id, article_tags } = req.query
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
        pool.query(`select * from article where article_tags = '%${ article_tags }%' order by update_time desc limit 6`, (err, data) => {
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
    const { id,title,article_tags,skill_tag,content,html_content } = req.body
    if ( !id,!title || !article_tags || !skill_tag || !content || !html_content ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let update_time = Timestamp_To_YYYY_MM_DD_HH_MM_SS( new Date() )
    // let html = marked(content.toString());
    pool.query(`update article set title = '${ title }',article_tags= '${ article_tags }',skill_tag = '${ skill_tag }',content = '${ content }',html_content = '${ html_content }',update_time = '${ update_time }' where id = '${ id }'`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            res.send({ code: 200, data: 'ok'})
        } 
    })
})

router.get('/like', (req, res) => {
    const { type,user_id,article_id,bool } = req.query
    if ( !type || !article_id || !bool ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let likes = 0
    let query = ''
    let time = Timestamp_To_YYYY_MM_DD_HH_MM_SS( new Date() )
    pool.query(`select likes_count from article where id = '${ article_id }'`, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            likes = data[0]['likes_count']
            if ( bool == 'true' ) {
                likes++
            } else {
                likes = likes == 0 ? 0 : ( likes - 1 )
            }
            pool.query(`update article set likes_count = ${ likes } where id = '${ article_id }'`,(err, data) => {
                if ( err ) {
                    console.log( err )
                    res.send({ code: '000021', msg: '系统繁忙'})
                } else {
                    if ( type == 2 ) {
                        if ( bool == 'true' ) {
                            query = `insert into article_likes(article_id,user_id,likes_time) value('${ article_id }','${ user_id }','${ time }')`
                        } else {
                            query = `delete from article_likes where article_id = '${ article_id }' and user_id = '${ user_id }'`
                        }
                        pool.query(query,(err, data) => {
                            if ( err ) {
                                console.log( err )
                                res.send({ code: '000021', msg: '系统繁忙'})
                            } else {
                                res.send({ code: 200, data: likes})
                            }
                        })
                    } else {
                        if ( bool == 'true' ) {
                            query = `insert into article_likes(article_id,likes_time) value('${ article_id }','${ time }')`
                            pool.query(query,(err, data) => {
                                if ( err ) {
                                    console.log( err )
                                    res.send({ code: '000021', msg: '系统繁忙'})
                                } else {
                                    res.send({ code: 200, data: likes})
                                }
                            })
                        } else {
                            res.send({ code: 200})
                        }
                    }
                }
            })
        }
    })
})

router.get('/user-like', token_verification, (req, res) => {
    const { type,user_id,article_id } = req.query
    if ( !type || !user_id ) { return res.send({ code: '000020', msg: '缺少参数'}) }
    let query = type == 1 ? `select * from article_likes where user_id = '${ user_id }'` : `select * from article_likes where user_id = '${ user_id }' and article_id = '${ article_id }'`
    pool.query(query, (err, data) => {
        if ( err ) {
            console.log( err )
            res.send({ code: '000021', msg: '系统繁忙'})
        } else {
            if ( type == 1 ) {
                let arr = []
                for ( let prop in data ) {
                    arr.push(data[prop].article_id.toString())
                }
                if ( arr.length == 0 ) { return res.send({ code: 200, data: []}) }
                pool.query(`select title,id from article where id in (${ arr.toString() })`,(err, data) => {
                    if ( err ) {
                        console.log( err )
                        res.send({ code: '000021', msg: '系统繁忙'})
                    } else {
                        pool.query(`select article_id,likes_time from article_likes where article_id in (${ arr.toString() })`, (err, datas) => {
                            if ( err ) {
                                console.log( err )
                                res.send({ code: '000021', msg: '系统繁忙'})
                            } else {
                                if ( datas && datas.length ) {
                                    datas.forEach((item,index) => {
                                        item.title = data[index].title
                                    })
                                    res.send({ code: 200, data: datas})
                                } else {
                                    res.send({ code: 200, data: []})
                                }
                            }
                        })
                    }
                })
            } else {
                res.send({ code: 200, data})
            }
        }
    })
})

router.get('/test', (req, res) => {
    pool.query('select count(*) from article', (err, data) => {
        res.send({data: data[0]['count(*)']})
    })
})

module.exports = router;