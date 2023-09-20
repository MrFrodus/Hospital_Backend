import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { UpdateNurseMetaDto } from "./dto/update-nurseMeta.dto";
import { CreateNurseMetaDto } from "./dto/create-nurseMeta.dto";
import { NurseMeta } from "./entities/nurseMeta.entity";

@Injectable()
export class NurseMetaService {
  constructor(
    @InjectRepository(NurseMeta)
    private nurseMetaRepository: Repository<NurseMeta>,
    private readonly fileManager: FileManager
  ) {}

  async create(createNurseMetaDto: CreateNurseMetaDto) {
    const newNurseMeta = this.nurseMetaRepository.create(createNurseMetaDto);

    return this.nurseMetaRepository.save(newNurseMeta);
  }

  async findAll() {
    return this.nurseMetaRepository.find({});
  }

  findOne(id: number) {
    return this.nurseMetaRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateNurseMetaDto: UpdateNurseMetaDto) {
    const nurseMeta = await this.findOne(id);

    return this.nurseMetaRepository.save({
      ...nurseMeta,
      ...updateNurseMetaDto,
    });
  }

  async remove(id: number) {
    return this.nurseMetaRepository.delete(id);
  }
}
