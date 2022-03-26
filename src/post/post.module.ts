import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { BlogModule } from 'src/blog/blog.module';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [BlogModule, forwardRef(() => ContentModule)],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
