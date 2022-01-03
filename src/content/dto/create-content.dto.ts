import { ContentTypes } from '../../interfaces/user';
import { IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  type: ContentTypes;

  @IsString()
  content: string;

  @IsNumber()
  order: number;

  @IsString()
  postId: string;
}
