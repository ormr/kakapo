import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import ObjectWithIdDto from 'src/utils/types/objectWithId.dto';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  post: ObjectWithIdDto;
}
