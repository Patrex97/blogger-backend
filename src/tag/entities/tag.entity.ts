import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  name: string;

  @ManyToMany(() => Blog, (Blog) => Blog.tags)
  @JoinTable()
  blogs: Blog[];
}
