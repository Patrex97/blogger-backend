import { Blog } from 'src/blog/entities/blog.entity';

export class CreatePostDto {
  title: string;
  content: string;
  createdAt: Date;
  blog: Blog;
}
