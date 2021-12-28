import { ContentTypes } from '../../interfaces/user';

export class CreateContentDto {
  type: ContentTypes;
  content: string;
  order: number;
  postId: string;
}
