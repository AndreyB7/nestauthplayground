import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersService } from './users.service';
import { UsersController}  from './users.controller';
import {UsersEntity} from "./users.entity";
import { DbModule } from 'src/database/db.module';
import { DbService } from 'src/database/db.service';
import { Connection } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        DbModule,
    ],
    providers: [UsersService, DbService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {
    constructor(private connection: Connection) {}
}