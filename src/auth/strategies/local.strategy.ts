import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super();
    }

    public async validate(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { userName: username }
        })

        if (!user) {
            this.logger.debug(`User ${username} not found`);
            throw new UnauthorizedException();
        };

        // temporary. Password stored in DB 
        if (password !== user.password) {
            this.logger.debug('Wrong credentials');
            throw new UnauthorizedException();
        };

        return user;
    }
}