import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersService } from './users.service';
import {UsersEntity} from "./users.entity";
//import { Connection } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import {UsersController} from './users.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
    exports: [UsersService, AuthService],
})
export class UsersModule {
//     constructor(private connection: Connection) {}
}