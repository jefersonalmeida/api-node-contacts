import { ApiProperty } from '@nestjs/swagger';

export class DeletedDto {
  @ApiProperty()
  deleted: number;

  constructor(deleted: number) {
    this.deleted = deleted;
  }
}
