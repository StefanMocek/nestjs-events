import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    public getTokenForUser(user: User): string {
        return this.jwtService.sign({
            userName: user.userName,
            sub: user.id,

        })
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}