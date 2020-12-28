import { Connection, Repository } from "typeorm";

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/users/users.entity";

@Injectable()
export class DbService {
    constructor(
        @InjectRepository(UsersEntity)
        private userEntityRepository: Repository<UsersEntity>,
        
        private connection: Connection,
    ) { }
    async transaction(fn: Function) {
        await this.connection.transaction( fn() );
    }

    async arrayTransaction(fn: Function) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            
            const query = await fn();
            console.log(query);
            //await query.forEach( async (entity) =>
            for (let i = 0; i < query.length; i++) {
                await queryRunner.manager.save(query[i])
                await queryRunner.manager.save(query[i])
            }
            //)

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}