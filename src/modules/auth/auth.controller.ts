import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { SignInDto } from "./dto/signin.dto";
import { RequestUserDto } from "../user/dto/request-user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post("register")
  register(
    @Body()
    requestUserDto: RequestUserDto
  ) {
    return this.authService.register(
      requestUserDto.user,
      requestUserDto[`${requestUserDto.user.role}Meta`]
    );
  }
}
