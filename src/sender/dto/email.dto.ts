import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @ApiProperty({
    required: true,
    description: 'Recipient email (, delimiter is available)',
    type: String,
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    required: true,
    description: 'Sender email',
    type: String,
  })
  @IsEmail()
  from: string;

  @ApiProperty({
    required: true,
    description: 'Sender name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    description: 'Email Subject',
    type: String,
  })
  @IsString()
  subject: string;

  @ApiProperty({
    required: true,
    description: 'Message to send (send html is also available)',
    type: String,
  })
  @IsString()
  message: string;

  @ApiProperty({
    required: true,
    description: 'Define if message is html type or not',
    type: Boolean,
  })
  @IsBoolean()
  isHtml: boolean;
}
