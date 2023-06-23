import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { userController } from "./users/user.controller";
import { AuthResolver } from "./auth.resolver";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserDoesNotExistConstraint } from "./validation/user-does-not-exist.constraint";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '60m'
                }
            })
        })],
    providers: [LocalStrategy, JwtStrategy, AuthService, AuthResolver, UserResolver, UserService, UserDoesNotExistConstraint],
    controllers: [AuthController, userController]
})
export class AuthModule {

}