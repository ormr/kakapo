import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import ObjectWithIdDto from 'src/utils/types/objectWithId.dto';

export class LikeDto {
  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  post: ObjectWithIdDto;
}

