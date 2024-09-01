const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_AUTH_EMAIL,
    pass: process.env.GOOGLE_AUTH_APP_PASSWORD,
  },
});

const Mail_Sender = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SENDER_NAME} <${process.env.GOOGLE_AUTH_EMAIL}>`, // Sender address
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
    return { status: 1, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { status: 0, message: error.message };
  }
};

module.exports = { Mail_Sender };
