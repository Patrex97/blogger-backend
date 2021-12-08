import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne((type) => Blog, (Blog) => Blog.id)
  blog: Blog;
}
