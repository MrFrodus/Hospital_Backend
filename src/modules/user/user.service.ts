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

  async findAll() {
    const users = await this.userRepository.find({
      relations: {
        patientMeta: true,
        physicianMeta: true,
        nurseMeta: true,
      },
    });

    if (users.length > 0) {
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

    return users;
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

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      relations: {
        patientMeta: true,
        physicianMeta: true,
        nurseMeta: true,
      },
      where: {
        email,
      },
    });
  }

  async findByEmailOrMobile(email: string, phone: number) {
    return this.userRepository.findOne({ where: [{ email }, { phone }] });
  }

  async findOneWithImgUrl(id: number) {
    const user = await this.findOne(id);

    if (user && user.profile_img) {
      user.profile_img = await this.fileManager.getFile(user.profile_img);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    if (user.profile_img) {
      await this.fileManager.deleteFile(user.profile_img);
    }

    if (user.role === "patient") {
      await this.patientMetaService.remove(user.patientMeta.id);
    } else if (user.role === "physician") {
      await this.physicianMetaService.remove(user.physicianMeta.id);
    } else if (user.role === "nurse") {
      await this.nurseMetaService.remove(user.nurseMeta.id);
    }

    return user;
  }

  async create(
    createUserDto: CreateUserDto,
    createMetaDto:
      | CreatePatientMetaDto
      | CreatePhysicianMetaDto
      | CreateNurseMetaDto
  ) {
    const newUser = this.userRepository.create(createUserDto);

    if (
      newUser.role === "patient" &&
      createMetaDto instanceof CreatePatientMetaDto
    ) {
      newUser.patientMeta = await this.patientMetaService.create(createMetaDto);
    } else if (
      newUser.role === "physician" &&
      createMetaDto instanceof CreatePhysicianMetaDto
    ) {
      newUser.physicianMeta =
        await this.physicianMetaService.create(createMetaDto);
    } else if (
      newUser.role === "nurse" &&
      createMetaDto instanceof CreateNurseMetaDto
    ) {
      newUser.nurseMeta = await this.nurseMetaService.create(createMetaDto);
    }

    return this.userRepository.save(newUser);
  }

  async uploadProfileImg(id: number, file: Express.Multer.File) {
    const user = await this.findOne(id);

    if (!user) {
      return null;
    }

    if (user.profile_img) {
      await this.fileManager.deleteFile(user.profile_img);
    }

    const fileName = await this.fileManager.upload(file);

    return this.update(+id, {
      profile_img: fileName,
    });
  }
}
