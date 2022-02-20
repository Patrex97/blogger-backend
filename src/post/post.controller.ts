import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findAll/:id')
  findUserPosts(@Param('id') blogId: string) {
    return this.postsService.findBlogPosts(blogId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findOne/:id')
  findOne(@Param('id') postId: string) {
    return this.postsService.findOne(postId);
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
