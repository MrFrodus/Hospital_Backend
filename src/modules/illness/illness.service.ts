import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateIllnessDto } from "./dto/create-illness.dto";
import { UpdateIllnessDto } from "./dto/update-illness.dto";
import { Illness } from "./entities/illness.entity";

@Injectable()
export class IllnessService {
  constructor(
    @InjectRepository(Illness)
    private illnessRepository: Repository<Illness>
  ) {}

  create(createIllnessDto: CreateIllnessDto) {
    const newIllness = this.illnessRepository.create(createIllnessDto);

    return this.illnessRepository.save(newIllness);
  }

  findAll() {
    return this.illnessRepository.find({
      relations: {
        patient: true,
        diagnosis: true,
      },
    });
  }

  findOne(id: number) {
    return this.illnessRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateIllnessDto: UpdateIllnessDto) {
    const illness = await this.findOne(id);

    if (!illness) {
      return null;
    }

    return this.illnessRepository.save({
      ...illness,
      ...updateIllnessDto,
    });
  }

  remove(id: number) {
    return this.illnessRepository.delete(id);
  }
}
