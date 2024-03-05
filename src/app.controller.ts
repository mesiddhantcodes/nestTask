import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {


  @Get('/')
  getHello() {
    return { message: 'welcome to the Code InBound' }
  }
}
