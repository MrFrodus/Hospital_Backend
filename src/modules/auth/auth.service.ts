import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common/exceptions";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreatePatientMetaDto } from "../patientMeta/dto/create-patientMeta.dto";
import { CreatePhysicianMetaDto } from "../physicianMeta/dto/create-physicianMeta.dto";
import { CreateNurseMetaDto } from "../nurseMeta/dto/create-nurseMeta.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException("Invalid email");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException("Invalid password");
      }

      const payload = { user_id: user.id, email: user.email, role: user.role };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(
    createUserDto: CreateUserDto,
    createMetaDto:
      | CreatePatientMetaDto
      | CreatePhysicianMetaDto
      | CreateNurseMetaDto
  ) {
    const { email, phone, password } = createUserDto;

    const existingUser = await this.userService.findByEmailOrMobile(
      email,
      phone
    );

    if (existingUser) {
      const errorField =
        email === existingUser.email ? "an email" : "a mobile number";
      const errorMessage = `User with such ${errorField} already exists`;

      throw new ConflictException(errorMessage);
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    createUserDto.password = hashedPassword;

    const newUser = await this.userService.create(createUserDto, createMetaDto);

    return newUser;
  }
}
