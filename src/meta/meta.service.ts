import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMetaDto } from "./dto/create-meta.dto";
import { UpdateMetaDto } from "./dto/update-meta.dto";
import { Meta } from "./entities/meta.entity";

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta) private metaRepository: Repository<Meta>
  ) {}

  create(createMetaDto: CreateMetaDto) {
    const newMeta = this.metaRepository.create(createMetaDto);

    return this.metaRepository.save(newMeta);
  }

  findAll() {
    return this.metaRepository.find();
  }

  findOne(id: number) {
    return this.metaRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMetaDto: UpdateMetaDto) {
    const meta = await this.findOne(id);

    return this.metaRepository.save({ ...meta, ...updateMetaDto });
  }

  async remove(id: number) {
    const meta = await this.findOne(id);

    return this.metaRepository.remove(meta);
  }
}
