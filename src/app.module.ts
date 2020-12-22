import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from "./typeorm.options";
import { MiddleModule } from './middle/middle.module';
import { PassportMiddleware } from './common/middleware/passport.middleware';
//import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { SessionMiddleware } from './common/middleware/session.middleware';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { MiddleController } from './middle/middle.controller';
//import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    MiddleModule,
    UsersModule,
    AuthModule,
    MiddleModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware, SessionMiddleware, PassportMiddleware)
      .forRoutes(MiddleController);
  }
  
}
