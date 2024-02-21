import { EmailServiceInterface } from 'src/application/services/email.service';
import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

// TODO implement strategy pattern
@Injectable()
export class NodeMaillerAdapterService implements EmailServiceInterface {
  async send(email: string, subject: string, text: string) {
    console.log('Is NodeMaillerAdapterService.send() called?');
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
      // if (error instanceof Error) {
      //   throw new ServerError(
      //     'Could not succed to send email ' + error.message,
      //     'sendVerify',
      //   );
      // }
    }
  }
  async confirmEmail(email: string, token: string, userId: string) {
    const url = `${process.env.API_URL}/auth/${userId}/verify/${token}`;
    const text = `Click on the link to verify your email: ${url}`;
    await this.send(email, 'validate your email', text);
  }
  async resetPassword(email: string, token: string, userId: string) {
    const url = `${process.env.API_URL}/auth/${userId}/reset-password/${token}`;
    const text = `You asked to reset your password. 
              To continue, click on the link below. : ${url}`;
    await this.send(email, 'Reset your password', text);
  }
}
