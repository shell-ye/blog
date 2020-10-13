const nodemailer = require('nodemailer');

const sandEmail = async ( email,info ) => {

  return new Promise(async (resolve, reject) => {
    //设置邮箱配置
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com', // 邮箱服务的主机，如smtp.qq.com
        port: 465, // 对应的端口号
        //开启安全连接
        secure: true,
        // secureConnection: true,
        //用户信息
        auth:{
            user: '1216814604@qq.com',
            pass: 'xzuzjnosqnjhhaea'
        }
    });
  
    //设置收件人信息
    let mailOptions={
      from: '1216814604@qq.com', // 谁发的
      to: email, // 发给谁
      subject: '邮箱验证码', // 主题是什么
      text: `您的验证码为: ${ info }` // 文本内容
    };

    //发送邮件
    let infos = await transporter.sendMail(mailOptions,(error,info)=>{
      if(error) {
        console.log( error )
        throw error
        reject(error)
      } else {
        resolve('发送成功')
      }
    });
  })
}

module.exports = {
  sandEmail
}