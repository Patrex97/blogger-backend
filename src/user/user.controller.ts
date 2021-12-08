import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { RegisterUserResponse } from '../interfaces/user';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from './entities/user.entity';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User) {
    return user;
  }

  @Post('/register')
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }
}
