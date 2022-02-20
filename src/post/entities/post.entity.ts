import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';
import { Content } from 'src/content/entities/content.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  featuredImage: string;

  @OneToMany(() => Content, (Content) => Content.post)
  content: Content[];

  @ManyToOne(() => Blog, (Blog) => Blog.id)
  blog: Blog;
}
