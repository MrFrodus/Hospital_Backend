import { UserDto } from "src/shared/user/user.dto";

export class CreatePatientDto extends UserDto {
  ssn: number;

  meta_id: number;
}
