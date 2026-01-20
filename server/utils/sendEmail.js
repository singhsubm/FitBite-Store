const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, // TLS
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const sendEmail = async ({ email, subject, message }) => {
  await transporter.sendMail({
    from: "FitBite <singhyu251@gmail.com>",
    to: email,
    subject,
    text: message,
  });
};

console.log("BREVO_USER", process.env.BREVO_USER);
console.log("BREVO_PASS", process.env.BREVO_PASS ? "LOADED" : "MISSING");


module.exports = sendEmail;
