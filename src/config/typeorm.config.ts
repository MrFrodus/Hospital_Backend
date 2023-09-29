import { ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { CustomConfigModule } from "./custom-config.module";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [CustomConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    const secrets = await configService.get("database");

    return {
      type: "mysql",
      host: secrets.db_host,
      port: secrets.db_port,
      username: secrets.db_username,
      database: secrets.db_database,
      password: secrets.db_password,
      entities: ["dist/**/*.entity.js"],
      migrations: ["dist/db/migrations/*.js"],
      synchronize: false,
    };
  },
};
