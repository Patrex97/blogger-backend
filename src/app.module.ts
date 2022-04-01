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
import { ContentModule } from './content/content.module';
import { Content } from './content/entities/content.entity';
import { TemplateModule } from './template/template.module';
import { Template } from './template/entities/template.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog',
      entities: [User, Blog, Post, Content, Template],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PostsModule,
    BlogModule,
    ContentModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
