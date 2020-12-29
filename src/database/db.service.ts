import { Connection } from "typeorm";

import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
    constructor(
        private connection: Connection,
    ) { }

    // async transactionCallBack(fn: Function) {
    //     await this.connection.transaction('SERIALIZABLE', fn() );
    // }
        async transactionCallBack(entityArray) {
            await this.connection.transaction( async manager => {
                await manager.save(entityArray)
            } );
        }

    async arrayTransaction(queryArray) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // .map .forEach - didnt work (COMMIT earlier than INSERT)
            // INSERT * 3          
            // for (let i = 0; i < queryArray.length; i++) {
            //     await queryRunner.manager.save(queryArray[i])
            // }
            await queryRunner.manager.save(queryArray)

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}