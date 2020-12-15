import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwksStrategy } from './jwks.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, JwksStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
