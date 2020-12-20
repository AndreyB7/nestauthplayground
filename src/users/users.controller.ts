import { Controller, Request, Get, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { JwkAuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { testDto } from './test.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService
    ) {}
  
  @UseGuards(JwkAuthGuard)
  @Post('profile')
  async login(@Request() req) {
    return this.authService.validateUser(req.user);
  }

  @UseGuards(JwkAuthGuard)
  @Get('profile')
  async findOne(@Request() req) {
    return this.userService.findOne({email: req.user.email});
  }

  @UseGuards(JwkAuthGuard)
  @Delete('profile')
  async remove(@Request() req) {
    const user = await this.authService.validateUser(req.user);
    this.userService.remove({id: user.id});
    return {...user, deleted: true};
  }

  @Get('users')
  async getAllUsers(@Body() createDto: testDto) {
    let users = await this.userService.getAllUsers();
    console.log(createDto);
    return users
  }
}