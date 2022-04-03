import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './entities/user.entity';
import { hashPassword } from '../utils/hash-password';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const checkUser = User.findOne({ email: newUser.email });
    if (checkUser) {
      throw new HttpException('User with this login already exists', 401);
    }
    const user = new User();
    user.email = newUser.email;
    user.password = hashPassword(newUser.password);
    await user.save();
    return this.filter(user);
  }

  async getUserData(currentUser: User): Promise<User | undefined> {
    const user = await User.findOne(
      { id: currentUser.id },
      { relations: ['blogs'] },
    );

    return user;
  }
}
