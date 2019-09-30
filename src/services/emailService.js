import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';
import config from '../config';

const mailgunOptions = {
  auth: {
    api_key: config.mailGun.activeApi,
    domain: config.mailGun.domainName,
  },
};
const transport = mailgunTransport(mailgunOptions);
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport);
  }

  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail(
        {
          from: config.mailGun.companySendingEmail,
          to,
          subject,
          text,
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        },
      );
    });
  }
}
export default new EmailService();
