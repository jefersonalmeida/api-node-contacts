import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ContactTypeEnum } from '../contact-type.enum';

export class CreateContactDto {
  @ApiProperty({ enum: ContactTypeEnum })
  @IsEnum(ContactTypeEnum)
  type: ContactTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  value: string;
}
