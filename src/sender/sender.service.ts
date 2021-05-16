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
   * Send email based on user input.
   * @param options smtp options and content
   * @param response response from sending
   * email
   * @private
   */
  private async emailSender(
    options: Record<string, any>,
    response,
  ): Promise<Record<string, any>> {
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

  /**
   * Validate post request and construct
   * email object to send on email.
   * @param email email DTO
   * @param body content
   * @private
   */
  private async validateAndConstructEmailObject(
    email: EmailDTO,
    body: Record<string, any>,
  ): Promise<[EmailDTO, Record<string, any>]> {
    const response = { message: {}, status: 200 };
    console.log(body.message);
    try {
      body.isHtml = body.isHtml == 'true';
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

    if (response.status != 200) return [email, response];

    await validate(email).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        this.logger.error(errors, null, SenderService.name);
        response.message = errors;
        response.status = 400;
      }
    });

    return [email, response];
  }

  /**
   * Send spoofed email based on
   * post request body (without file)
   * @param body post request body
   */
  public async sendEmailToUser(
    body: Record<string, any>,
  ): Promise<Record<string, any>> {
    let email: EmailDTO = new EmailDTO();
    let requestResponse;

    // eslint-disable-next-line prefer-const
    [email, requestResponse] = await this.validateAndConstructEmailObject(
      email,
      body,
    );

    if (requestResponse.status != 200) return requestResponse;

    let options;

    if (email.isHtml) {
      options = {
        to: email.to,
        from: `"${email.name}" <${email.from}>`,
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
    return await this.emailSender(options, requestResponse);
  }

  /**
   * Send spoofed email based on
   * post request body (with file)
   * @param body post request body
   * @param file uploaded file
   */
  public async sendEmailWithFileToUser(
    body: Record<string, any>,
    file: Express.Multer.File,
  ): Promise<Record<string, any>> {
    let email: EmailDTO = new EmailDTO();
    let requestResponse;
    // eslint-disable-next-line prefer-const
    [email, requestResponse] = await this.validateAndConstructEmailObject(
      email,
      body,
    );

    if (requestResponse.status != 200) return requestResponse;

    let options;

    if (email.isHtml) {
      options = {
        to: email.to,
        from: `"${email.name}" <${email.from}>`,
        subject: email.subject,
        html: email.message,
        attachments: [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ],
      };
    } else {
      options = {
        to: email.to,
        from: `"${email.name}" <${email.from}>`,
        subject: email.subject,
        text: email.message,
        attachments: [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ],
      };
    }
    return await this.emailSender(options, requestResponse);
  }
}
