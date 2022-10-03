import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class LocalFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}

export default LocalFile;
