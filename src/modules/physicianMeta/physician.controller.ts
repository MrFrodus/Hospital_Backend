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
import { RequestPhysicianMetaDto } from "./dto/request-physicianMeta.dto";
import { UpdatePhysicianMetaDto } from "./dto/update-physicianMeta.dto";
import { CreatePhysicianMetaDto } from "./dto/create-physicianMeta.dto";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Controller("physicianMeta")
export class PhysicianMetaController {
  constructor(private readonly physicianMetaService: PhysicianMetaService) {}

  @Post()
  create(
    @Body(new ValidationPipe())
    requestPhysicianMetaDto: RequestPhysicianMetaDto
  ) {
    return this.physicianMetaService.create(
      requestPhysicianMetaDto.physicianMeta as CreatePhysicianMetaDto,
      requestPhysicianMetaDto.meta as CreateMetaDto
    );
  }

  @Get()
  findAll() {
    return this.physicianMetaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.physicianMetaService.findOne(+id);
  }

  @Get("img/:id")
  findOneWithImgUrl(@Param("id") id: string) {
    return this.physicianMetaService.findOneWithImgUrl(+id);
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
