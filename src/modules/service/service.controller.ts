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
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const service = await this.serviceService.findOne(+id);

    if (!service) {
      return new NotFoundException();
    }

    return service;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ) {
    const updatedService = await this.serviceService.update(
      +id,
      updateServiceDto
    );

    if (!updatedService) {
      return new NotFoundException();
    }

    return updatedService;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedService = await this.serviceService.remove(+id);

    if (!removedService) {
      return new NotFoundException();
    }

    return removedService;
  }
}
