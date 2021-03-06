import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, email: string): Promise<any> {
    const user = {username, email};
    const currentUser = await this.authService.validateUser(user);
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    return currentUser;
  }
}