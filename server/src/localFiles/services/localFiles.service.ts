import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalFileDto } from '../dto/localFile.dto';
import LocalFile from '../entities/localFile.entity';

@Injectable()
class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>
  ) {}

  async getFileById(fileId: string) {
    const file = await this.localFilesRepository.findOne({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      throw new NotFoundException();
    }

    return file;
  }

  async getAllFiles() {
    return await this.localFilesRepository.find();
  }

  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = await this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }

  async deleteFileById(id: string) {
    return await this.localFilesRepository.delete({ id });
  }
}

export default LocalFilesService;
