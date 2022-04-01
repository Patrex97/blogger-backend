import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from 'src/user/entities/user.entity';
import { TemplateDto } from './dto/template.dto';
import { TemplateService } from './template.service';

@Controller('/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('/save')
  async saveTemplate(@Body() { contentList }: TemplateDto): Promise<boolean> {
    console.log(contentList);

    return true;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTemplates(@UserObj() user: User): Promise<string[] | undefined> {
    console.log(user);

    return [''];
  }
}
