const nodeMailer = require('nodemailer');
const smtpConfig = require('../config/mail-smtp-config')

const transporter = nodeMailer.createTransport(smtpConfig);

transporter.verify(error => {
  if (error) {
    console.log('Mail Transporter Error: \n', error);
  } else {
    console.log("Mailer Transporter: connection verified.");
  }
});

function sendEmail (emailTemplate) {
  transporter.sendMail({ ...emailTemplate });
}

module.exports = {
  sendEmail
};
