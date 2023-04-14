import { IsNotEmpty, IsNumber } from 'class-validator';

class ObjectWithIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export default ObjectWithIdDto;
