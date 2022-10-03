import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LocalFile from './entities/localFile.entity';
import LocalFilesService from './services/localFiles.service';
import LocalFilesController from './controllers/localFiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), ConfigModule],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
  controllers: [LocalFilesController],
})
export class LocalFilesModule {}
