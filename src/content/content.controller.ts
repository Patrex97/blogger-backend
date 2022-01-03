import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { storageDir } from '../utils/storage';

@Controller('/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('/add')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      { dest: path.join(storageDir(), 'photos') },
    ),
  )
  create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<Content> {
    return this.contentService.create(createContentDto, files);
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
