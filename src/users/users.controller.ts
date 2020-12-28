import { Controller, Request, Get, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { testDto } from './test.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';


@Controller('auth')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('add')
  async transaction(@Request() req) {
    await this.userService.addUsers(req.user);
    return await this.userService.getAllUsers();
  }
  
  @Get('clean')
  async cleandb() {
    await this.userService.removeAll();
    return 'db cleaned'
  }

  @UseGuards(LocalAuthGuard)
  @Post('profile')
  async login(@Request() req) {
    return this.userService.authUser(req);
  }

  //@UseGuards(JwksAuthGuard)
  @Get('profile')
  async findOne(@Request() req) {
    return this.userService.findOne({email: req.user.email});
  }

  //@UseGuards(JwksAuthGuard)
  @Delete('profile')
  async remove(@Request() req) {
    const user = await this.userService.authUser(req);
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