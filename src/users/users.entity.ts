import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({schema: "test", name: "user"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public email: string;

  @Column({type: "varchar"})
    public name: string;

}