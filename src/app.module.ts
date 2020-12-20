import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from "./typeorm.options";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
