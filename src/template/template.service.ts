import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { TemplateDto } from './dto/template.dto';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplateService {
  async saveTemplate(
    templateDto: TemplateDto,
    author: User,
  ): Promise<Template> {
    const { title, contentList } = templateDto;
    const newTemplate = await Template.create();
    newTemplate.title = title;
    newTemplate.contentList = contentList.join('-');
    newTemplate.author = author;
    return await Template.save(newTemplate);
  }

  async removeTemplate(templateId: string): Promise<boolean> {
    return !!(await Template.delete(templateId))?.affected;
  }

  async findAllTemplates(author: User): Promise<Template[] | undefined> {
    return Template.find({
      where: {
        author,
      },
    });
  }
}
