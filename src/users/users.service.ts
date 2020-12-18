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
    private readonly users = [
    {
      userId: 1,
      email: '0129507@gmail.com',
      username: 'john4',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@gmail.com',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  public async create(user): Promise<User | undefined> {
    user = await this.userEntityRepository
       .create({
         ...user
       });
      //.save();

    return user;
  }
}