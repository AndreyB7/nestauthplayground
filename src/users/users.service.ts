import { Repository } from "typeorm";

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
//import { DbService } from "src/database/db.service";
import { AuthService } from "src/auth/auth.service";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
    @InjectRepository(UsersEntity)
    private readonly userEntityRepository: Repository<UsersEntity>
    //private dbServise: DbService,
  ) { }

  async authUser(req) {
    return this.authService.validateUser(req.user);
  }

  async addUsers(userData) {
    // await this.dbServise.transaction( async ()=> {
       
    //   //const entityarr = [
    //     await this.userEntityRepository.create({ name: userData.name, email: userData.email }),
    //     await this.userEntityRepository.create({ name: userData.name, email: userData.email })
    //   //]
    //   //return entityarr
    // })
  }
  async addUsersArray(user) {
    //user = this.userEntityRepository;
    //await this.dbServise.arrayTransaction([user, user, user]);
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