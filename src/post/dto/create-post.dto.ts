import { User } from '../../user/entities/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
  createdAt: Date;
  Author: User;
}
