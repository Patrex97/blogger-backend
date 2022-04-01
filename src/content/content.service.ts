import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { Post } from '../post/entities/post.entity';
import { Content } from './entities/content.entity';
import { ContentTypes } from '../interfaces/user';

@Injectable()
export class ContentService {
  async create(
    contentData: CreateContentDto,
    image: Express.Multer.File,
  ): Promise<Content> {
    const newPostContent = new Content();
    try {
      newPostContent.type = contentData.type;
      console.log(image);
      if (contentData.type === ContentTypes.Image) {
        newPostContent.content = image?.filename || '';
      }
      if (contentData.type === ContentTypes.Text) {
        newPostContent.content = contentData.content;
      }
      newPostContent.order = contentData.order;
      newPostContent.post = await Post.findOneOrFail({
        id: contentData.postId,
      });
    } catch (e: any) {
      const post = await Post.findOneOrFail({
        id: contentData.postId,
      });
      await post.remove();
      throw new Error(e);
    }
    console.log(newPostContent);

    await newPostContent.save();
    return newPostContent;
  }

  async removePostContent(postId: string): Promise<boolean> {
    const contentList = await Content.createQueryBuilder('content')
      .leftJoinAndSelect('content.post', 'post')
      .where('post.id = :postId', {
        postId,
      })
      .getMany();
    return !!(await Content.remove(contentList)).length;
  }
}
