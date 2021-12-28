import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Post } from '../post/entities/post.entity';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  async create(createContentDto: CreateContentDto): Promise<Content> {
    const newPostContent = new Content();
    newPostContent.type = createContentDto.type;
    newPostContent.content = createContentDto.content;
    newPostContent.order = createContentDto.order;
    newPostContent.post = await Post.findOne({
      id: createContentDto.postId,
    });
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
