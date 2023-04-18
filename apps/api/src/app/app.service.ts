// app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): string {
    return 'Hello World!'; // or any other general functionality
  }
}
