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
      newPostContent.post = await Post.findOne({
        id: contentData.postId,
      });
    } catch (e) {
      const post = await Post.findOne({
        id: contentData.postId,
      });
      await post.remove();
      throw new Error(e);
    }
    console.log(newPostContent);

    await newPostContent.save();
    return newPostContent;
  }

  removePostContent(postId: string) {
    const contentList = Content.createQueryBuilder('content')
      .leftJoinAndSelect('content.postId', 'post')
      .where('post.id = :postId', {
        postId,
      })
      .getMany();
    console.log('content List', contentList);
    return contentList;
  }
}
