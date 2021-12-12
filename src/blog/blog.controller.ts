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
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from 'src/user/entities/user.entity';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createBlogDto: CreateBlogDto, @UserObj() user: User) {
    return this.blogService.create(createBlogDto, user);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  findAll(@UserObj() user: User): Promise<Blog[]> | null {
    return this.blogService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
