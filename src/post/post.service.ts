import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class PostsService {
  async create(postData: CreatePostDto): Promise<Post> {
    const { title, featuredImage, blogId } = postData;
    const newPost = new Post();
    newPost.title = title;
    newPost.featuredImage = featuredImage;
    newPost.createdAt = new Date().toString();
    newPost.blog = await Blog.findOneOrFail({ id: blogId });
    await newPost.save();
    return newPost;
  }

  async findBlogPosts(blogId: string): Promise<Post[]> {
    const blog = await Blog.findOne({ where: { id: blogId } });
    return await Post.find({
      where: { blog },
    });
  }

  async findOne(postId: string): Promise<Post> {
    return await Post.findOneOrFail({
      relations: ['content'],
      where: { id: postId },
    });
  }

  async update(postId: string, postData: CreatePostDto): Promise<boolean> {
    const { title, featuredImage } = postData;
    const updatedPost = await Post.findOneOrFail({
      relations: ['blog'],
      where: {
        id: postId,
      },
    });
    updatedPost.title = title;
    if (featuredImage) {
      updatedPost.featuredImage = featuredImage;
    }
    return !!(await Post.update(postId, updatedPost)).affected;
  }

  async remove(postId: string): Promise<boolean> {
    return !!(await Post.delete(postId)).affected;
  }
}
