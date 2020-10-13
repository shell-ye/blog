const { checkToken } = require('./../utils/jwt')
const db = require('../mysql')

const token_verification = ( req, res, next ) => {
    for ( let prop in req.route.methods ) {
        if ( prop == 'post' ) {
            const { token } = req.body
            checkToken(token).then(data => {
                next()
            }).catch(err => {
                console.log('post-token:',token)
                console.log('server-token:',req.session.token)
                req.session = null
                res.send({ code: '000013', msg: '无效的 token'})
            })
        } else {
            const { token } = req.query
            checkToken(token).then(data => {
                next()
            }).catch(err => {
                console.log('get-token:',token)
                console.log('server-token:',req.session.token)
                req.session = null
                res.send({ code: '000013', msg: '无效的 token'})
            })
        }
    }
}

const checkAdmin = async ( req, res, next ) => {
    let result = await db.select('admin').from('user').where('email', req.session.email).queryValue().catch(err => {
        console.log( err )
        res.send({code: 0, msg: '系统繁忙'})
        return
    })
    if ( result == 1 ) {
        next()
    } else {
        res.send({code: 0, msg: '没有权限'})
    }
}

module.exports = {
    token_verification,
    checkAdmin
}