import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;
}
