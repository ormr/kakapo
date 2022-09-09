import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentsModule } from './comments/comments.module';

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
        entities: [],
        autoLoadEntities: true,
        // entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        // synchronize: false,
        // // autoLoadEntities: true,
        // logging: true,
        // logger: 'file',
        // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        // migrationsRun: true,
        // cli: {
        //   // Location of migration should be inside src folder
        //   // to be compiled into dist/ folder.
        //   migrationsDir: 'src/migrations',
        // },
      }),
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthenticationModule,
  ],
})
export class AppModule { }
