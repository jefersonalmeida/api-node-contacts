import { ApiProperty } from '@nestjs/swagger';
import { ContactTypeEnum } from '../contact-type.enum';

export class ContactDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: ContactTypeEnum;

  @ApiProperty()
  value: string;
}
