import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('auth')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('profile')
  async login(@Request() req) {
    return req.user;
  }
  
  //@UseGuards(JwtAuthGuard)
  @Get('profile')
  async addDataToDB(@Body() data) {
    // various add to DB solutions:
    const response = this.userService.addUsersEntity(data.users)
    //const response = this.userService.addUsersTransaction(data)
    //const response = this.userService.addUsersTransactionCallback(data)
    return response
  }
  
  //@UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers() {
    let users = await this.userService.getAllUsers();
    return users
  }

  // DEV DB CLEAN
  @Get('clean')
  async cleandb() {
    await this.userService.removeAll();
    return 'db cleaned'
  }
}