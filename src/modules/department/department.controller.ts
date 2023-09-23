import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const department = await this.departmentService.findOne(+id);

    if (!department) {
      return new NotFoundException();
    }

    return department;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    const updatedDepartment = await this.departmentService.update(
      +id,
      updateDepartmentDto
    );

    if (!updatedDepartment) {
      return new NotFoundException();
    }

    return updatedDepartment;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedDepartment = await this.departmentService.remove(+id);

    if (!removedDepartment) {
      return new NotFoundException();
    }

    return removedDepartment;
  }
}
