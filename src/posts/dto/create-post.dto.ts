import { User } from '../../user/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
  createdAt: Date;
  Author: User;
}
