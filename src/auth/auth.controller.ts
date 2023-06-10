import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        return {
            userId: req.user.id,
            token: 'token will go here'
        }
    }
}