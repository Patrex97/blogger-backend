import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storageDir } from '../utils/storage';

@Controller('/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: path.join(storageDir(), 'photos'),
    }),
  )
  create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Content> {
    return this.contentService.create(createContentDto, image);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
