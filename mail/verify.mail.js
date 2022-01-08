const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function sendMail(data) {
    console.log(data);
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
        subject: "✅ ელფოსტის ვერიფიკაცია val-do.com", // Subject line
        text: `✅ თქვენი ვერიფიკაციის კოდია ${data['verificationCode']}`, // plain text body
        html: `<b>✅ თქვენი ვერიფიკაციის კოდია ${data['verificationCode']}</b>`, // html body
    });
}