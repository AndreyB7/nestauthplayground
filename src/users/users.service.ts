import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { DbService } from "src/database/db.service";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userEntityRepository: Repository<UsersEntity>,
    private dbServise: DbService,
  ) { }

  async addUsersEntity(data) {
    const usersEntity = data.users.map(
      user => this.userEntityRepository.create({ name: user.name, email: user.email })
    )
    // TRANSACTION INSERT * 1 COMMIT
    this.userEntityRepository.save(usersEntity)
    return {"complete": "true"}
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