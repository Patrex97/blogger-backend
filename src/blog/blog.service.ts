import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  async create(
    createBlogDto: CreateBlogDto,
    author: User,
  ): Promise<Blog> | null {
    const newBlog = new Blog();
    newBlog.name = createBlogDto.name;
    newBlog.url = createBlogDto.url;
    newBlog.author = author;
    newBlog.tags = createBlogDto.tags;
    await newBlog.save();
    return newBlog;
  }

  async findAll(author: User): Promise<Blog[]> | null {
    return await Blog.find();
  }

  async findOne(id: string): Promise<Blog> {
    return await Blog.findOneOrFail({
      id,
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  async remove(id: string): Promise<string> {
    console.log(id);
    const removedBlog = await Blog.findOne({
      id,
    });
    console.log(removedBlog);
    await Blog.remove(removedBlog);
    return `Blog removed succesfully`;
  }
}
