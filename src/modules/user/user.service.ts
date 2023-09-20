import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { PhysicianMetaService } from "../physicianMeta/physicianMeta.service";
import { PatientMetaService } from "../patientMeta/patientMeta.service";
import { NurseMetaService } from "../nurseMeta/nurseMeta.service";
import { CreatePatientMetaDto } from "../patientMeta/dto/create-patientMeta.dto";
import { CreatePhysicianMetaDto } from "../physicianMeta/dto/create-physicianMeta.dto";
import { CreateNurseMetaDto } from "../nurseMeta/dto/create-nurseMeta.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileManager: FileManager,
    private patientMetaService: PatientMetaService,
    private physicianMetaService: PhysicianMetaService,
    private nurseMetaService: NurseMetaService
  ) {}

  async createPatient(
    createUserDto: CreateUserDto,
    createPatientMetaDto: CreatePatientMetaDto
  ) {
    const newUser = this.userRepository.create(createUserDto);

    const newPatientMeta =
      await this.patientMetaService.create(createPatientMetaDto);

    newUser.patientMeta = newPatientMeta;

    return this.userRepository.save(newUser);
  }

  async createPhysician(
    createUserDto: CreateUserDto,
    createPhysicianMetaDto: CreatePhysicianMetaDto
  ) {
    const newUser = this.userRepository.create(createUserDto);

    const newPhysicianMeta = await this.physicianMetaService.create(
      createPhysicianMetaDto
    );

    newUser.physicianMeta = newPhysicianMeta;

    return this.userRepository.save(newUser);
  }

  async createNurse(
    createUserDto: CreateUserDto,
    createNurseMetaDto: CreateNurseMetaDto
  ) {
    const newUser = this.userRepository.create(createUserDto);

    const newNurseMeta = await this.nurseMetaService.create(createNurseMetaDto);

    newUser.nurseMeta = newNurseMeta;

    return this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: {
        patientMeta: true,
        physicianMeta: true,
        nurseMeta: true,
      },
    });

    const usersWithImgUrl = await Promise.all(
      users.map(async (user) => {
        if (user.profile_img) {
          user.profile_img = await this.fileManager.getFile(user.profile_img);
        }

        return user;
      })
    );

    return usersWithImgUrl;
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      relations: {
        patientMeta: true,
        physicianMeta: true,
        nurseMeta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const user = await this.findOne(id);

    if (user.profile_img) {
      user.profile_img = await this.fileManager.getFile(user.profile_img);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  // async remove(id: number) {
  //   const user = await this.findOne(id);

  //   await this.fileManager.deleteFile(user.profile_img);

  //   if (user.role === "patient") {
  //     await this.patientMetaService.remove(user.patientMeta.id);
  //   } else if (user.role === "physician") {
  //     await this.physicianMetaService.remove(user.physicianMeta.id);
  //   } else if (user.role === "nurse") {
  //     await this.nurseMetaService.remove(user.nurseMeta.id);
  //   }

  //   return user;
  // }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.fileManager.deleteFile(user.profile_img);

    const metaService = {
      patient: this.patientMetaService,
      physician: this.physicianMetaService,
      nurse: this.nurseMetaService,
    };

    const metaId = user[`${user.role}Meta`].id;
    await metaService[user.role].remove(metaId);

    return user;
  }

  async uploadProfileImg(id: number, file: Express.Multer.File) {
    const fileName = await this.fileManager.upload(file);

    return this.update(+id, {
      profile_img: fileName,
    });
  }
}
