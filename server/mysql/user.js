const pool = require('./pool')

const sendEmail = ( info ) => {
    let add = 'INSERT INTO user(name,password) VALUES(?,?)'
    return new Promise((res, rej) => {
        pool.query(add, [info.name, info.password], (err, result) => {
            if ( err ) {
                console.log('插入失败' + err.message)
                rej('插入失败')
            } else {
                console.log('插入成功')
                res('插入成功')
            }
        })
    })
}

module.exports = {
    add
}