import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { ContentTypes } from '../../interfaces/user';

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: ContentTypes;

  @Column('text')
  content: string;

  @Column()
  order: number;

  @ManyToOne((type) => Post, (Post) => Post.id)
  post: Post;
}
