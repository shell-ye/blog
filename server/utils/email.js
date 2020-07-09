let Email = require('email').Email

let sendEmail = ( email,code ) => {
    let myMsg = new Email({ 
        from: "1216814604@qq.com", 
        to:   `${ email }`, 
        subject: "Knock knock...", 
        body: `您的验证码为${ code },五分钟内有效`
    })
    
    myMsg.send((err) => {
        return new Promise((res, rej) => {
            if ( err ) {
                rej( err )
            } else {
                res('发送成功')
            }
        })
    })
}

module.exports = sendEmail