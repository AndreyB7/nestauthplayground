import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from "./typeorm.options";
import { RedisModule} from 'nestjs-redis'
//import { DbModule } from './database/db.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    AuthModule,
    UsersModule,
    //DbModule,
    RedisModule.register({
      name: 'test',
      url: 'redis://127.0.0.1:6379',
    })
  ]
})
export class AppModule {}
