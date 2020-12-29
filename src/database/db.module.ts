import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [DbService]
})
export class DbModule {
    constructor(private connection: Connection) {}
}