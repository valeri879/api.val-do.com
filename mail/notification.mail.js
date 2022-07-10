const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function sendNotificationToAdmin(data) {
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
        to: `valeri.kharitonashvili1@gmail.com`, // list of receivers
        subject: data['subject'], // Subject line
        text: data['text'], // plain text body
    });
}