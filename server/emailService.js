const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'mail.ru',
  auth: {
    user: process.env.POST_MAIL,
    pass: process.env.POST_PASSWORD
  }
});

const sendVerificationEmail = (email, token) => {
  const url = `${process.env.BACKEND_LINK}/verify-email?token=${token}`;
  transporter.sendMail({
    from: '"Capyano" <capyano.online@mail.ru>',
    to: email,
    subject: 'Capyano verification',
    html: `<div style="background-color: antiquewhite; display: flex; flex-direction: column; align-items: center; padding: 50px 0px;">
            <div style="text-align: center; width: 100%;">
              <p style="font-size: 24px; color: #953700; font-weight: bolder">Для подтверждения регистрации нажмите на кнопку:</p>
              <p style="font-size: 24px; color: #953700; font-weight: bolder; margin-bottom: 40px">To confirm registration, tap the button:</p>
              <a href="${url}" style="background-color: #A65323; color: aliceblue; font-size: 24px; border-radius: 5px; padding: 10px 15px; text-decoration: none">Capyano!</a>
            </div>
          </div>`
  }, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    }
  });
};

const sendPasswordEmail = (email, token) => {
  const resetUrl = `${process.env.FRONTEND_LINK}/reset-password?token=${token}`;
  transporter.sendMail({
    from: '"Capyano" <capyano.online@mail.ru>',
    to: email,
    subject: 'Capyano reset password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid black; border-radius: 5px; background-color: antiquewhite">
        <h2 style="text-align: center; color: #953700; font-size: 26px">Reset Password (Сброс пароля)</h2>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">Hello!</p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">Здравствуйте,</p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">
          You have requested a password reset. Please click on the button below to set a new password:
        </p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">
          Вы запросили сброс пароля. Пожалуйста, нажмите на кнопку ниже, чтобы установить новый пароль:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" style="background-color: #953700; color: aliceblue; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 24px;">Reset Password</a>
        </div>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">
          If you haven't requested a password reset, just ignore this email.
        </p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">
          Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.
        </p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">Best regards,<br>Capyano Team</p>
        <p style="font-size: 24px; color: #953700; font-weight: bolder">С уважением,<br>Команда Capyano</p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail, sendPasswordEmail };
