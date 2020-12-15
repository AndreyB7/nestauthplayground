import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwksStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(headers): Promise<any> {
    console.log(headers);
    const user = await this.authService.validateJwks(headers);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}