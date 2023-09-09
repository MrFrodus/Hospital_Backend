import { Injectable } from '@nestjs/common';
import { CreatePhysicianDto } from './dto/create-physician.dto';
import { UpdatePhysicianDto } from './dto/update-physician.dto';

@Injectable()
export class PhysicianService {
  create(createPhysicianDto: CreatePhysicianDto) {
    return 'This action adds a new physician';
  }

  findAll() {
    return `This action returns all physician`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physician`;
  }

  update(id: number, updatePhysicianDto: UpdatePhysicianDto) {
    return `This action updates a #${id} physician`;
  }

  remove(id: number) {
    return `This action removes a #${id} physician`;
  }
}
