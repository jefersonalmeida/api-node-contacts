import { ApiProperty } from '@nestjs/swagger';

export class EntitiesDto<T> {
  @ApiProperty()
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }
}
