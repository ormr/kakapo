import * as path from 'path'
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentsModule } from './comments/comments.module';
import { LocalFilesModule } from './localFiles/localFile.module';
import { LikesModule } from './likes/likes.module';
import { CreatedAllEntities1681650046713 } from './migrations/1681650046713-CreatedAllEntities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [path.join(__dirname, '..', '/dist/**/*.entity{.ts,.js}')],
        migrations: [CreatedAllEntities1681650046713],
        synchronize: false,
      }),
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    AuthenticationModule,
    LocalFilesModule,
  ],
})
export class AppModule { }
