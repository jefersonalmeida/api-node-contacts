import { Injectable } from '@nestjs/common';


export interface Message {
  message: string;
}

@Injectable()
export class AppService {
  health(): Message {
    return { message: 'OK!' };
  }
}
