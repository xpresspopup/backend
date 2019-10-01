import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from '../config';

const transportOptions = smtpTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'automart144@gmail.com',
    pass: 'OkafoR@1993',
  },
  tls: {
    rejectUnauthorized: false,
  },
});
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transportOptions);
  }

  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail(
        {
          from: 'automart144@gmail.com',
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
