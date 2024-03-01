import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HealthcheckController {
  @Get('healthcheck')
  @HttpCode(200)
  async healthCheck() {
    return { message: 'API is up and running' };
  }
}
