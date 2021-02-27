import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude, Type } from 'class-transformer';

export type ClassType<T = any> = new (...args: any[]) => T;

export function EntityResponse<T extends ClassType>(ResourceCls: T) {
  class Entity extends ResourceCls {
    @ApiModelProperty()
    data: T;
  }

  return Entity;
}

export class ResultEntity<T> {
  @ApiModelProperty({ description: 'status code' })
  readonly code: number = 0;
  @ApiModelProperty({ description: 'return value' })
  @Type(options => {
    return (options.newObject as ResultEntity<T>).type;
  })
  data: T;
  @Exclude()
  private type: Function;

  constructor(data: T, type?: Function) {
    this.data = data;
    this.type = type;
  }
}

/*export class EntityDto<T> {
 @ApiProperty()
 data: T;

 constructor(data: T) {
 this.data = data;
 }
 }*/
