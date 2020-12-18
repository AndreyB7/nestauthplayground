import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwkAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService) {}
  
  @UseGuards(JwkAuthGuard)
  @Get('auth/google')
  async login(@Request() req) {
    return this.authService.validateUser(req.user);
  }
  async create(@Request() req) {
    return this.userService.create(req.user);
  }
}