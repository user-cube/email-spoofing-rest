import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { LoggerService } from '../logger/logger.service';
import { EmailDTO } from './dto/email.dto';
import { validate } from 'class-validator';

@Injectable()
export class SenderService {
  constructor(
    private readonly mailerService: MailerService,
    private logger: LoggerService,
  ) {}

  /**
   * Send sopped email based on
   * post request body.
   * @param body
   */
  public async sendEmailToUser(
    body: Record<string, any>,
  ): Promise<Record<string, any>> {
    const response = { message: {}, status: 200 };

    const email = new EmailDTO();

    try {
      email.to = body.to;
      email.from = body.from;
      email.subject = body.subject;
      email.message = body.message;
      email.isHtml = body.isHtml;
      email.name = body.name;
    } catch (e) {
      response.message = { msg: 'Missing parameters' };
      response.status = 400;
    }

    if (response.status != 200) return response;

    await validate(email).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        this.logger.error(errors, null, SenderService.name);
        response.message = errors;
        response.status = 400;
      }
    });

    if (response.status != 200) return response;

    let options;

    if (email.isHtml) {
      options = {
        to: email.to,
        from: email.from,
        subject: email.subject,
        html: email.message,
      };
    } else {
      options = {
        to: email.to,
        from: `"${email.name}" <${email.from}>`,
        subject: email.subject,
        text: email.message,
      };
    }

    await this.mailerService
      .sendMail(options)
      .then(() => {
        response.message = { msg: 'Email sent with success.' };
        response.status = 200;
      })
      .catch((error) => {
        this.logger.error(error, null, SenderService.name);
        response.message = { msg: 'Error sending email' };
        response.status = 503;
      });

    return response;
  }
}
