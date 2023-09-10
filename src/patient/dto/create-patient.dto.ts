import { UserDto } from "src/SharedDtos/user.dto";

export class CreatePatientDto extends UserDto {
  ssn: number;

  meta_id: number;
}
