import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async login(user: any) {
    const payload = { username: user.name, email:user.email, sub: user.Id };
    //const token = this.jwtService.sign(payload)
    return user;
  }
  async validateUser(user: any): Promise<any> {
    const currentUser = await this.usersService.findOne({email: user.email});
    if (currentUser && currentUser.email === user.email) {
      return currentUser;
    }
    if (!currentUser) {
      const newuser = await this.usersService.create(user);
      return newuser;
    }
    return null;
  }
}