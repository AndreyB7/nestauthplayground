import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async login(user: any) {
    
    const payload = { username: user.name, email:user.email, sub: user.userId };
    //const token = this.jwtService.sign(payload)
    return user;
  }
  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user.email === email) {
      return user;
    }
    // add user
    return null;
  }
}