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
import { SharpPipe } from "src/pipes/sharp.pipe";
import { FileManager } from "src/filestore/file-manager.service";
import { MetaService } from "./meta.service";
import { CreateMetaDto } from "./dto/create-meta.dto";
import { UpdateMetaDto } from "./dto/update-meta.dto";

@Controller("meta")
export class MetaController {
  constructor(
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  @Post()
  create(@Body() createMetaDto: CreateMetaDto) {
    return this.metaService.create(createMetaDto);
  }

  @Get()
  findAll() {
    return this.metaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.metaService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMetaDto: UpdateMetaDto) {
    return this.metaService.update(+id, updateMetaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.metaService.remove(+id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(@UploadedFile(new SharpPipe()) file: Express.Multer.File) {
    const fileName = await this.fileManager.upload(file);

    return this.metaService.create({
      profile_img: fileName,
    });
  }
}
