import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwkAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  
  @UseGuards(JwkAuthGuard)
  @Get('auth/google')
  async login(@Request() req) {
    return this.authService.validateUser(req.user.email);
  }
}