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
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SharpPipe } from "src/common/pipes/sharp.pipe";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.userService.findOne(+id);

    if (!user) {
      return new NotFoundException();
    }

    return user;
  }

  @Get("img/:id")
  async findOneWithImgUrl(@Param("id") id: string) {
    const user = await this.userService.findOneWithImgUrl(+id);

    if (!user) {
      return new NotFoundException();
    }

    return user;
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
    const user = await this.userService.uploadProfileImg(+id, file);

    if (!user) {
      return new NotFoundException();
    }

    return user;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(+id, updateUserDto);

    if (!updatedUser) {
      return new NotFoundException();
    }

    return updatedUser;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedUser = await this.userService.remove(+id);

    if (!removedUser) {
      return new NotFoundException();
    }

    return removedUser;
  }
}
