const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "alwaysusbr.7@gmail.com",
    pass: "irashqwyoilukzth"
  }
});

module.exports = transporter;