const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendConfirmationEmail(email, url) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Please confirm your email by clicking <a href="${url}">here</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };
