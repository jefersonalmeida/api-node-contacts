import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && ValidationPipe.isEmpty(value)) {
      throw new HttpException(
        'Falha na validação: Nenhum corpo foi enviado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { metatype } = metadata;
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(this.formatErrors(errors), HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private static toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        return Object.keys(err.constraints).map((item) => {
          return {
            field: err.property,
            message: err.constraints[item],
          };
        });
      })
      .slice();
  }

  private static isEmpty(value: any) {
    return Object.keys(value).length <= 0;
  }
}
