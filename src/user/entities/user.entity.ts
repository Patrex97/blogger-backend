import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 40,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId?: string | null;

  @OneToMany(() => Blog, (Blog) => Blog.author)
  blogs?: Blog[];
}
