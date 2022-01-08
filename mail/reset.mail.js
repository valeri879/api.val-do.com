const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function sendMail(data) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"😎 val-do.com" <valeri.kharitonashvili@live.com>', // sender address
        to: `${data['email']}`, // list of receivers
        subject: "🔐 პაროლის აღდგენა - val-do.com", // Subject line
        text: `🔐 პაროლის აღსადგენად გთხოვთ გადახვიდეთ ბმულზე http://localhost:4200/set-password?email=${data['email']}&token=${data['token']}`, // plain text body
        html: `🔐  პაროლის აღსადგენად გთხოვთ გადახვიდეთ ბმულზე <br> <a href="http://localhost:4200/set-password?email=${data['email']}&token=${data['token']}">http://localhost:4200/set-password?email=${data['email']}&token=${data['token']}</a>`, // html body
    });
}