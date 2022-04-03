import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from 'src/user/entities/user.entity';
import { TemplateDto } from './dto/template.dto';
import { Template } from './entities/template.entity';
import { TemplateService } from './template.service';

@Controller('/template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/save')
  async saveTemplate(
    @Body() templateDto: TemplateDto,
    @UserObj() user: User,
  ): Promise<Template> {
    return this.templateService.saveTemplate(templateDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async removeTemplate(@Param('id') id: string): Promise<boolean> {
    return this.templateService.removeTemplate(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTemplates(@UserObj() user: User): Promise<Template[] | undefined> {
    return this.templateService.findAllTemplates(user);
  }
}
