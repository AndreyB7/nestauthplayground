import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from "./typeorm.options";
//import { MiddleModule } from './middle/middle.module';
import { PassportMiddleware } from './common/middleware/passport.middleware';
//import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { SessionMiddleware } from './common/middleware/session.middleware';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { MiddleController } from './middle/middle.controller';
import { RedisModule} from 'nestjs-redis'
//import { UsersController } from './users/users.controller';
//import { DbModule } from './database/db.module';
//import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    //MiddleModule,
    AuthModule,
    UsersModule,
    //DbModule,
    RedisModule.register({
      name: 'test',
      url: 'redis://127.0.0.1:6379',
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware, SessionMiddleware, PassportMiddleware)
      .forRoutes(MiddleController);
  }
  
}
