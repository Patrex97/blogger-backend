import { Controller, Request, Get } from "@nestjs/common";

@Controller('/')
export class AppController {
  @Get('/')
  async login(@Request() req) {
    return 'Hello world!';
  }
}
