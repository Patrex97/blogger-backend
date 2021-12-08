import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (User) => User.id)
  author: User;
}
