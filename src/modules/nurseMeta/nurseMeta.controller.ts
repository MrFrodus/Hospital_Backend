import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NurseMetaService } from "./nurseMeta.service";
import { CreateNurseMetaDto } from "./dto/create-nurseMeta.dto";
import { UpdateNurseMetaDto } from "./dto/update-nurseMeta.dto";

@Controller("nurseMeta")
export class NurseMetaController {
  constructor(private readonly nurseMetaService: NurseMetaService) {}

  @Post()
  create(
    @Body()
    createNurseMetaDto: CreateNurseMetaDto
  ) {
    return this.nurseMetaService.create(createNurseMetaDto);
  }

  @Get()
  findAll() {
    return this.nurseMetaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.nurseMetaService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNurseMetaDto: UpdateNurseMetaDto
  ) {
    return this.nurseMetaService.update(+id, updateNurseMetaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.nurseMetaService.remove(+id);
  }
}
