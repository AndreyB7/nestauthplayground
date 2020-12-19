import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwkAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@UseGuards(JwkAuthGuard)
@Controller('auth')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService) {}
  
  @Get('google')
  async login(@Request() req) {
    return this.authService.validateUser(req.user);
  }
  
  @Get('me')
  async findOne(@Request() req) {
    return this.userService.findOne({email: req.user.email});
  }
  @Get('me/del')
  async remove(@Request() req) {
    const user = await this.authService.validateUser(req.user);
    this.userService.remove({id: user.id});
    return {...user, deleted: true};
  }
  @Get('users')
  async getAllUsers(@Request() req) {
    return this.userService.getAllUsers();
  }
}