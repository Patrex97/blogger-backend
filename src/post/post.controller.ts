import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/entities/user.entity';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('/findAll')
  @UseGuards(AuthGuard('jwt'))
  findUserPosts(blogId: string, @UserObj() user: User) {
    return this.postsService.findBlogPosts(blogId, user);
  }

  // @Get('/:id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }
  //
  // @Patch('/:id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }
  //
  // @Delete('/:id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
