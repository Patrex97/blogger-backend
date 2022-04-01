import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 40,
  })
  name!: string;

  @Column()
  url?: string;

  @ManyToOne(() => User, (User) => User.id)
  author!: User;

  @OneToMany(() => Post, (Post) => Post.blog)
  posts?: Post[];
}
