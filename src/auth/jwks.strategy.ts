import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

const jwksRsa = require('jwks-rsa');

@Injectable()
export class JwksStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
      }),
      issuer: 'https://accounts.google.com',
      algorithms: ['RS256'],
    });
  }

  async validate(payload) {
    const user = {name: payload.name, email:payload.email};
    return user;
  }
}
