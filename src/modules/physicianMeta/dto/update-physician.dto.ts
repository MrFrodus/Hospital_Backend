import { PartialType } from "@nestjs/mapped-types";
import { CreatePhysicianMetaDto } from "./create-physicianMeta.dto";

export class UpdatePhysicianMetaDto extends PartialType(
  CreatePhysicianMetaDto
) {}
