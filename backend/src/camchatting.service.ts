import { Injectable } from '@nestjs/common';

@Injectable()
export class CamChattingService {
  getHello(): string {
    return 'Hello World!';
  }
}
