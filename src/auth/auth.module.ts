import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { userController } from "./controllers/user.controller";
import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
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