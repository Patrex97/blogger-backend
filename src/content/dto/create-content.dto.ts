import { ContentTypes } from '../../interfaces/user';
import { IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  type!: ContentTypes;

  content?: string | undefined;

  @IsNumber()
  order!: number;

  @IsString()
  postId!: string;
}
