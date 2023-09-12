import nodemailer from 'nodemailer';
import ServerError from '../helpers/errors/server.error';

export default {
  async sendVerify(email: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        secure: true,
        service: 'Gmail',
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text
      })
    } catch (error: any) {
      throw new ServerError(error.message)
    }
  }
}