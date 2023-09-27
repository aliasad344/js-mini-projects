const nodemailer = require("nodemailer");
const generateOTP = require('./opt');
require("dotenv").config();  

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.user ,
        pass: process.env.pass ,
    }
})

const otp = generateOTP();
console.log(otp)
const mailOptions = {
    from: process.env.user ,
    to: process.env.reciever ,
    subject: 'Hello from Nodemailer',
    text: `Your otp is ${otp}. Please verify otp within 30 seconds.`,
    html: `<p>Your otp is <strong>${otp}</strong>. Please verify otp within 30 seconds.</p>`
}

transport.sendMail(mailOptions, (err, result) => {
    if (err) {
        console.log("Error while sending email", err);
    } else {
        console.log("Email sent", result.response);
    }
});
