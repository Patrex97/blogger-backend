import { Tag } from '../../tag/entities/tag.entity';

export class CreateBlogDto {
  name: string;
  url: string;
  tags: Tag[] | null;
}
