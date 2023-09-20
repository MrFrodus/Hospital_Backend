import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common/pipes";
import { PhysicianMetaService } from "./physicianMeta.service";
import { UpdatePhysicianMetaDto } from "./dto/update-physicianMeta.dto";
import { CreatePhysicianMetaDto } from "./dto/create-physicianMeta.dto";

@Controller("physicianMeta")
export class PhysicianMetaController {
  constructor(private readonly physicianMetaService: PhysicianMetaService) {}

  @Post()
  create(
    @Body(new ValidationPipe())
    createPhysicianMetaDto: CreatePhysicianMetaDto
  ) {
    return this.physicianMetaService.create(createPhysicianMetaDto);
  }

  @Get()
  findAll() {
    return this.physicianMetaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.physicianMetaService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updatePhysicianMetaDto: UpdatePhysicianMetaDto
  ) {
    return this.physicianMetaService.update(+id, updatePhysicianMetaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.physicianMetaService.remove(+id);
  }
}
