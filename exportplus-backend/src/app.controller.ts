import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This is a placeholder controller. You can add your own routes and methods here.
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
