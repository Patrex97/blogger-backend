import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class PostsService {
  async create(postData: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.title = postData.title;
    newPost.createdAt = new Date().toString();
    newPost.blog = await Blog.findOne({ id: postData.blogId });
    await newPost.save();
    return newPost;
  }

  async findAll() {
    console.log(await Post.find());
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
