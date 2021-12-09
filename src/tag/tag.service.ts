import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = new Tag();
    newTag.name = createTagDto.name;
    await newTag.save();
    return newTag;
  }

  async findAll(): Promise<Tag[]> | null {
    return await Tag.find();
  }
}
