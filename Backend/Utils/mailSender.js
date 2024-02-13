// utils/mailSender.js
const nodemailer = require('nodemailer');

async function mailSender(email, title, body) {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'Zomato',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log("email error", error.message);
  }
};





module.exports = mailSender;
