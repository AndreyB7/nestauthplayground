import { ExtractJwt, Strategy, JwtPayloadInterface } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const jwksRsa = require('jwks-rsa');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
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

  async validate(payload: JwtPayloadInterface) {
    const user = {name: payload.name, email:payload.email};
    return user;
  }
}
