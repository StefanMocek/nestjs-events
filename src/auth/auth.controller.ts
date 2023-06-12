import { ClassSerializerInterceptor, Controller, Get, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.dacorator";
import { User } from "./entity/user.entity";
import { AuthGuardLocal } from "./decorators/auth-guard.local";
import { AuthGuardJwt } from "./decorators/auth-guard.jwt";

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User) {
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async getProfile(@CurrentUser() user: User) {
        return user;
    }
} 