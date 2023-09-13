import { UserDto } from "src/shared/user/user.dto";

export class CreateNurseDto extends UserDto {
  position: string;

  department_id: number;

  meta_id: number;
}
