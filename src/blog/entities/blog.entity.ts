import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';

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

  @ManyToMany(() => Tag, (Tag) => Tag.blogs)
  tags: Tag[];
}
