import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Post } from '../post/entities/post.entity';
import { Content } from './entities/content.entity';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { ContentTypes } from '../interfaces/user';

@Injectable()
export class ContentService {
  async create(
    contentData: CreateContentDto,
    files: MulterDiskUploadedFiles,
  ): Promise<Content> {
    const contentPhoto = files?.photo?.[0] ?? null;
    const newPostContent = new Content();
    newPostContent.type = contentData.type;
    if (contentData.type === ContentTypes.Image) {
      newPostContent.content = contentPhoto?.filename ?? null;
    }
    if (contentData.type === ContentTypes.Text) {
      newPostContent.content = contentData.content;
    }
    newPostContent.order = contentData.order;
    newPostContent.post = await Post.findOne({
      id: contentData.postId,
    });
    console.log(newPostContent);

    await newPostContent.save();
    return newPostContent;
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
