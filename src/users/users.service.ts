import { EntityManager, Entity, EntityTarget, ObjectID, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { DbService } from "src/database/db.service";
import { Connection } from "typeorm";
import { IUser } from "src/auth/interfaces/user";

// This should be a real class/interface representing a user entity
export type User = any;
export type usersEntity = EntityTarget<UsersEntity>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userEntityRepository: Repository<UsersEntity>,
    private dbServise: DbService,
    private connection: Connection,
  ) { }

  async addUsersEntity(users: IUser[]) {
    await this.connection.transaction('READ COMMITTED', async (manager: EntityManager) => {
      
      const usersEntity = users.map(
        user => this.userEntityRepository.create({ name: user.name, email: user.email })
      )
      const userEntityRepositoryManager = manager.getRepository(UsersEntity);
      //const usersRepository = manager.getRepository('usersEntity');
      // TRANSACTION INSERT*1 COMMIT
      //this.userEntityRepository.save(usersEntity)
      await userEntityRepositoryManager.save(usersEntity[0]);
      const readUserM = await this.userEntityRepository.findOne({ email: "first@gmail.com" });
      const readUserE = await userEntityRepositoryManager.findOne({ email: "first@gmail.com" });
      console.log(readUserM);
      console.log(readUserE);
      await this.dbServise.managerForvardTest(usersEntity, userEntityRepositoryManager)
      
    })
    return await this.userEntityRepository.findOne({ email: "first@gmail.com" });
  }
  async addUsersTransaction(data) {
    const usersEntity = data.users.map(
      user => this.userEntityRepository.create({ name: user.name, email: user.email })
    )
    await this.dbServise.arrayTransaction(usersEntity);
    return {"transaction": "true"}
  }

  async addUsersTransactionCallback(data) {
    const entityData = this.userEntityRepository.create(data.users)
    this.dbServise.transactionCallBack(entityData)
    return {"transactionCallBack": "true"}
  }


  async findOne(where): Promise<User | undefined> {
    const user = await this.userEntityRepository.findOne({ where });
    return user;
  }

  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.userEntityRepository.find();
  }

  public async create(user): Promise<User | undefined> {
    const newuser = this.userEntityRepository.create({ name: user.username, email: user.email }).save();
    return newuser;
  }
  async remove(user): Promise<void> {
    await this.userEntityRepository.delete(user.id);
  }
  async removeAll(): Promise<void> {
    const users = await this.userEntityRepository.find();
    console.log(users);
    users.forEach(async user => {
      if (user.id > 13) { await this.userEntityRepository.delete(user.id) }
    })
  }
}