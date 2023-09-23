import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";

const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
