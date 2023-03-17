import { IsNotEmpty, IsUUID } from 'class-validator';

class ObjectWithIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export default ObjectWithIdDto;
