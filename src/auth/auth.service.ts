import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(user: any): Promise<any> {
    const currentUser = await this.usersService.findOne({email: user.email});
    if (currentUser && currentUser.email === user.email) {
        const payload = { username: user.name, email:user.email, sub: user.Id };
        currentUser.token = user.access_token = this.jwtService.sign(payload);
      return currentUser;
    }
    if (!currentUser) {
      const newuser = await this.usersService.create(user);
      return newuser;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, email:user.email, sub: user.Id };
  return { access_token: this.jwtService.sign(payload) }
  }
}