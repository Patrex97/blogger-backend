import { Content } from '../../content/entities/content.entity';

export class CreatePostDto {
  title: string;
  blogId: string;
  content: Content[] | [];
}
