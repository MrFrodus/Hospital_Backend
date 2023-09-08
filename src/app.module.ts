import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MetaModule } from "./meta/meta.module";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MetaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
