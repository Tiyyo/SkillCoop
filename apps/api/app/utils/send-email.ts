import nodemailer from 'nodemailer';
import ServerError from '../helpers/errors/server.error';
import type {
  SendConfirmationEmail,
  SendResetPasswordEmail,
} from 'skillcoop-types';

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
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ServerError(error.message);
      }
    }
  },
  async sendEmailToConfirmEmail({
    emailToken,
    email,
    userId,
  }: SendConfirmationEmail) {
    const url = `${process.env.API_URL}/auth/${userId}/verify/${emailToken}`;

    const text = `Click on the link to verify your email: ${url}`;

    await this.sendVerify(email, 'validate your email', text);
  },
  async sendLinkRestPassword({
    resetToken,
    email,
    userId,
  }: SendResetPasswordEmail) {
    const url = `${process.env.API_URL}/auth/
                  ${userId}/reset-password/${resetToken}`;

    const text = `You asked to reset your password. 
              To continue, click on the link below. : ${url}`;

    await this.sendVerify(email, 'Reset your password', text);
  },
};
