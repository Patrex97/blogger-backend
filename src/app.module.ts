import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entities/blog.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { ContentModule } from './content/content.module';
import { Content } from './content/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog',
      entities: [User, Blog, Tag, Post, Content],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PostsModule,
    BlogModule,
    TagModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
