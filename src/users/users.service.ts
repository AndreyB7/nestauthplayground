import {Repository} from "typeorm";

import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userEntityRepository: Repository<UsersEntity>,
  ) {}

  async findOne(where): Promise<User | undefined> {
    const user  = await this.userEntityRepository.findOne({where});
    return user;
  }

  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.userEntityRepository.find();
  }

  public async create(user): Promise<User | undefined> {
    const usersEntity: UsersEntity = UsersEntity.create();
    const {name, email} = user;
    usersEntity.name = name;
    usersEntity.email = email;
    const newuser = await UsersEntity.save(usersEntity);
    return newuser;
  }
  async remove(user): Promise<void> {
    await this.userEntityRepository.delete(user.id);
  }
}