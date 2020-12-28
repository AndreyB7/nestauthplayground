import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwksStrategy } from './jwks.strategy';
//import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
//import { UsersModule } from 'src/users/users.module';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    //UsersService,
    JwksStrategy,
    LocalStrategy],
  exports: [
    AuthService
  ],
})
export class AuthModule {}