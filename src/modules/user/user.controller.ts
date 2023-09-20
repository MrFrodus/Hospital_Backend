import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SharpPipe } from "src/common/pipes/sharp.pipe";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRequestDto } from "./dto/request-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("patient")
  createPatient(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createPatient(
      userRequestDto.user,
      userRequestDto.patient_meta
    );
  }

  @Post("physician")
  createPhysician(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createPhysician(
      userRequestDto.user,
      userRequestDto.physician_meta
    );
  }

  @Post("nurse")
  createNurse(@Body() userRequestDto: UserRequestDto) {
    return this.userService.createNurse(
      userRequestDto.user,
      userRequestDto.nurse_meta
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Get("img/:id")
  findOneWithImgUrl(@Param("id") id: string) {
    return this.userService.findOneWithImgUrl(+id);
  }

  @Patch("upload/:id")
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(
    @UploadedFile(new SharpPipe()) file: Express.Multer.File,
    @Param("id") id: string
  ) {
    return this.userService.uploadProfileImg(+id, file);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
