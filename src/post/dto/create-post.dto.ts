import { Blog } from 'src/blog/entities/blog.entity';
import { Content } from '../../content/entities/content.entity';

export class CreatePostDto {
  title: string;
  blog: Blog;
  content: Content[] | [];
}
