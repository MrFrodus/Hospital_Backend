import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import secretManagerConfig from "./secret-manager.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [secretManagerConfig],
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
