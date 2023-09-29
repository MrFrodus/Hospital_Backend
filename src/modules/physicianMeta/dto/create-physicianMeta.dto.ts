import { IsInt, IsString, Validate } from "class-validator";
import { IsExist } from "src/common/validation/is-exist.rule";

export class CreatePhysicianMetaDto {
  @IsString()
  specification?: string;

  @IsString()
  qualification?: string;

  @IsInt()
  @Validate(IsExist, ["Department", "id"], {
    message: "department with such an id doesn't exists",
  })
  department_id?: number;
}
