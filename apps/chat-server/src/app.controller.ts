import {
  Controller,
  Get,
  HttpCode,
  Req,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

export class Message {
  content: string;
  senderId: string;
  receiverId: string;
}

@Controller('api')
export class AppController {
  //  Dependency Injection
  // constructor(private readonly appService: AppService) { }

  // Decorator to define a route type
  @Get('/:id')
  // methods to handle requests
  @HttpCode(200)
  getHello(@Req() request: Request) {
    // return this.appService.getHello();
    const { id } = request.params;
    return { message: 'Hello World!', params: id };
  }
  @Post('message')
  create(@Body() createMessage: Message): string {
    console.log(createMessage);
    return 'This action adds a new cat';
  }
  @MessagePattern('user-queue')
  async handleMessage(data) {
    console.log(data);
  }
}
