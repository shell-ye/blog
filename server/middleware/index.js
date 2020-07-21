const token_verification = (req, res, next) => {
    for ( let prop in req.route.methods ) {
        if ( prop == 'post' ) {
            const { token } = req.body
            if ( !token || token != req.session.token ) { return res.send({ code: '000013', msg: '无效的 token'})}
        } else {
            const { token } = req.query
            if ( !token || token != req.session.token ) { return res.send({ code: '000013', msg: '无效的 token'})}
        }
        next()
    }
}

module.exports = {
    token_verification
}