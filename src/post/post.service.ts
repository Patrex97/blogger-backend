import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';

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

  async findBlogPosts(blogId: string, user: User): Promise<Post[]> {
    const blog = Blog.findOne({ where: { id: blogId } });
    const posts = await Post.find({
      // join: {
      //   alias: 'post',
      //   leftJoinAndSelect: {
      //     type: 'post.content',
      //   },
      // },
      where: { blog },
    });
    return posts;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
