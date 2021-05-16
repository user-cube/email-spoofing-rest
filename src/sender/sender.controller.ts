import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SenderService } from './sender.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailDTO } from './dto/email.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

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

  @ApiBody({
    description: 'Email content',
    required: true,
    type: EmailDTO,
  })
  @ApiImplicitFile({
    description: 'File to attach on email',
    name: 'file',
    required: true,
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
    summary: 'Send spoofed emails with file attached',
    description:
      'Send spoofed emails based on post request content with file attached',
  })
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public async sendEmailWithFile(
    @Res() res,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.sender.sendEmailWithFileToUser(body, file);
    res.status(result.status).json(result.message);
  }
}
