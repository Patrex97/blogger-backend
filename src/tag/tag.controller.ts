import { Controller, Get, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/add')
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  @Get('/all')
  findAll(): Promise<Tag[]> | null {
    return this.tagService.findAll();
  }
}
