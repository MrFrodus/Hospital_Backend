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
import { PhysicianService } from "./physician.service";
import { RequestPhysicianDto } from "./dto/request-physician.dto";
import { UpdatePhysicianDto } from "./dto/update-physician.dto";
import { CreatePhysicianDto } from "./dto/create-physician.dto";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Controller("physician")
export class PhysicianController {
  constructor(private readonly physicianService: PhysicianService) {}

  @Post()
  create(@Body(new ValidationPipe()) requestPhysicianDto: RequestPhysicianDto) {
    return this.physicianService.create(
      requestPhysicianDto.physician as CreatePhysicianDto,
      requestPhysicianDto.meta as CreateMetaDto
    );
  }

  @Get()
  findAll() {
    return this.physicianService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.physicianService.findOne(+id);
  }

  @Get("img/:id")
  findOneWithImgUrl(@Param("id") id: string) {
    return this.physicianService.findOneWithImgUrl(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updatePhysicianDto: UpdatePhysicianDto
  ) {
    return this.physicianService.update(+id, updatePhysicianDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.physicianService.remove(+id);
  }
}
