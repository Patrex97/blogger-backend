import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [BlogModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
