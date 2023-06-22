import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    public async validateUser(userName: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { userName: userName }
        })

        if (!user) {
            throw new UnauthorizedException();
        };

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        };

        return user;
    }
}