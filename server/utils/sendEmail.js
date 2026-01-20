const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Transporter banao (Gmail use kar rahe ho to App Password chahiye hoga)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ya host/port use kar sakte ho
    auth: {
      user: process.env.EMAIL_USER, // .env me daalna padega
      pass: process.env.EMAIL_PASS, // .env me daalna padega
    },
  });

  // 2. Email Options
  const mailOptions = {
    from: "FitBite <" + process.env.EMAIL_USER + ">",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;