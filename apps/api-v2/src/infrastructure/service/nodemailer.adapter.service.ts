import { EmailServiceInterface } from 'src/application/services/email.service';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { NestEnvVariableAdapterService } from './env.adapter.service';
import { ApplicationException } from 'src/application/exceptions/application.exception';

// TODO implement strategy pattern
@Injectable()
export class NodeMaillerAdapterService implements EmailServiceInterface {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
  ) {}
  async send(email: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: this.envVariableService.getEnvVariable('EMAIL_HOST'),
        secure: true,
        service: 'Gmail',
        port: Number(this.envVariableService.getEnvVariable('EMAIL_PORT')),
        auth: {
          user: this.envVariableService.getEnvVariable('EMAIL_USER'),
          pass: this.envVariableService.getEnvVariable('EMAIL_PASSWORD'),
        },
      });
      await transporter.sendMail({
        from: this.envVariableService.getEnvVariable('EMAIL_USER'),
        to: email,
        subject: subject,
        text: text,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApplicationException(
          'Could not succed to send email - ' + error.message,
          'NodeMaillerAdapterService',
        );
      }
    }
  }
  async confirmEmail(email: string, token: string, userId: string) {
    const url = `${this.envVariableService.getApiUrl()}/api/user/${userId}/verify/${token}`;
    const text = `Click on the link to verify your email: ${url}`;
    await this.send(email, 'validate your email', text);
  }
  async resetPassword(email: string, token: string, userId: string) {
    const url = `${this.envVariableService.getApiUrl()}/api/user/${userId}/reset-password/${token}`;
    const text = `You asked to reset your password. 
              To continue, click on the link below. : ${url}`;
    await this.send(email, 'Reset your password', text);
  }
}
