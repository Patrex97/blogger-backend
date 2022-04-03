import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  async create(
    createBlogDto: CreateBlogDto,
    author: User,
  ): Promise<Blog | undefined> {
    const newBlog = new Blog();
    newBlog.name = createBlogDto.name;
    newBlog.url = `https:/theBestBlog.test/${createBlogDto.url}`;
    newBlog.author = author;
    await newBlog.save();
    return newBlog;
  }

  async findAll(author: User): Promise<Blog[] | undefined> {
    return await Blog.find();
  }

  async findOne(id: string): Promise<Blog> {
    return await Blog.findOneOrFail({
      id,
    });
  }

  update(id: number) {
    return `This action updates a #${id} blog`;
  }

  async remove(id: string): Promise<string> {
    const removedBlog = await Blog.findOneOrFail({
      id,
    });
    await Blog.remove(removedBlog);
    return `Blog removed succesfully`;
  }
}
