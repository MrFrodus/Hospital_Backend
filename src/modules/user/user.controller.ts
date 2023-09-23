import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SharpPipe } from "src/common/pipes/sharp.pipe";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 80000 }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      }),
      new SharpPipe()
    )
    file: Express.Multer.File,
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
