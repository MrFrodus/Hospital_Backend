import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);

    return this.departmentRepository.save(newDepartment);
  }

  findAll() {
    return this.departmentRepository.find();
  }

  findOne(id: number) {
    return this.departmentRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);

    if (!department) {
      return null;
    }

    return this.departmentRepository.save({
      ...department,
      ...updateDepartmentDto,
    });
  }

  remove(id: number) {
    return this.departmentRepository.delete(id);
  }
}
