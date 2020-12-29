import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import {UsersEntity} from "../users/users.entity";
  
  @Entity({schema: "test", name: "auth"})
  export class AuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({type: "varchar"})
    public refreshToken: string;
  
    @Column({type: "bigint"})
    public refreshTokenExpiresAt: number;
  
    public accessToken: string;
  
    public accessTokenExpiresAt: number;
  
    @JoinColumn()
    @OneToOne(_type => UsersEntity)
    public user: UsersEntity;
  
    @Column({type: "timestamptz"})
    public timeCreatedAt: string;
  
    @Column({type: "timestamptz"})
    public timeUpdatedAt: string;
  
    @BeforeInsert()
    public beforeInsert(): void {
      const date = new Date();
      this.timeCreatedAt = date.toISOString();
      this.timeUpdatedAt = date.toISOString();
    }
  
    @BeforeUpdate()
    public beforeUpdate(): void {
      const date = new Date();
      this.timeUpdatedAt = date.toISOString();
    }
  }
  