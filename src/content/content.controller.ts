import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
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

  @Delete('/:id')
  removePostContent(@Param('id') postId: string) {
    return this.contentService.removePostContent(postId);
  }
}
