import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersService } from './users.service';
import {UsersEntity} from "./users.entity";
import { AuthService } from '../auth/auth.service';
import { UsersController}  from './users.controller';
//import { Connection } from 'typeorm';
//import { DbService } from 'src/database/db.service';
//import { DbModule } from 'src/database/db.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        //DbModule,
        AuthModule,
    ],
    providers: [UsersService,
        // DbService,
         AuthService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {
    //constructor(private connection: Connection) {}
}