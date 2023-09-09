import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicianService } from './physician.service';
import { CreatePhysicianDto } from './dto/create-physician.dto';
import { UpdatePhysicianDto } from './dto/update-physician.dto';

@Controller('physician')
export class PhysicianController {
  constructor(private readonly physicianService: PhysicianService) {}

  @Post()
  create(@Body() createPhysicianDto: CreatePhysicianDto) {
    return this.physicianService.create(createPhysicianDto);
  }

  @Get()
  findAll() {
    return this.physicianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicianDto: UpdatePhysicianDto) {
    return this.physicianService.update(+id, updatePhysicianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicianService.remove(+id);
  }
}
