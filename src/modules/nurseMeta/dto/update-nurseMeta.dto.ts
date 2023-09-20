import { PartialType } from "@nestjs/mapped-types";
import { CreateNurseMetaDto } from "./create-nurseMeta.dto";

export class UpdateNurseMetaDto extends PartialType(CreateNurseMetaDto) {}
