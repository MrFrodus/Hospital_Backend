import { UserDto } from "src/SharedDtos/user.dto";

export class CreatePhysicianDto extends UserDto {
  specification: string;

  qualification: string;

  department_id: number;

  meta_id: number;
}
