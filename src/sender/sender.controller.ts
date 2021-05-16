import { Body, Controller, Post, Res } from '@nestjs/common';
import { SenderService } from './sender.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailDTO } from './dto/email.dto';

@ApiTags('Spoofing')
@Controller('email')
export class SenderController {
  constructor(private sender: SenderService) {}

  @ApiBody({
    description: 'Email content',
    required: true,
    type: EmailDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing or badly typed parameter',
  })
  @ApiResponse({
    status: 503,
    description: 'SMTP Service Unavailable',
  })
  @ApiOperation({
    summary: 'Send spoofed emails',
    description: 'Send spoofed emails based on post request content',
  })
  @Post()
  public async sendEmail(@Res() res, @Body() body) {
    const result = await this.sender.sendEmailToUser(body);
    res.status(result.status).json(result.message);
  }
}
