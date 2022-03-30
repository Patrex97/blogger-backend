import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  Delete,
  Patch,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('/post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('featuredImage', {
      dest: path.join(storageDir(), 'photos'),
    }),
  )
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.create({
      ...createPostDto,
      featuredImage: image?.filename,
    });
  }

  @Get('/file')
  getFile(@Res() res: Response) {
    const file = createReadStream(
      path.join(storageDir(), 'photos', '0ca48a3615411ebd37a3120a25c50fa7'),
    );
    file.pipe(res);
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

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('featuredImage', {
      dest: path.join(storageDir(), 'photos'),
    }),
  )
  update(
    @Param('id') postId: string,
    @Body() postData: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.update(postId, {
      ...postData,
      featuredImage: image?.filename,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  remove(@Param('id') postId: string) {
    return this.postsService.remove(postId);
  }
}
