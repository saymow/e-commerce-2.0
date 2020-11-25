import nodemailer from 'nodemailer';

const Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailProps {
  email: string;
  subject: string;
  html: string;
}

class EmailSenderService {
  async execute(mail: EmailProps) {
    await Transporter.sendMail({
      from: 'eCommerceCompany@test.com',
      to: mail.email,
      subject: mail.subject,
      html: mail.html,
    });

    console.log(`Email sent to ${mail.email}`.green);
  }
}

export default EmailSenderService;
