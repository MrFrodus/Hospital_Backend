import { PartialType } from "@nestjs/mapped-types";
import { CreatePatientMetaDto } from "./create-patientMeta.dto";

export class UpdatePatientMetaDto extends PartialType(CreatePatientMetaDto) {}
