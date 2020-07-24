const { checkToken } = require('./../utils/jwt')

const token_verification = (req, res, next) => {
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

module.exports = {
    token_verification
}