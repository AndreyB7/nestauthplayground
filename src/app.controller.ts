import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwksAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwksAuthGuard)
  @Get('auth/google')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}