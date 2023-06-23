import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { CreateUserDto } from "../input/create.user.dto";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user.service";

@Controller('users')
export class userController {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);

        return {
            ...user,
            token: this.authService.getTokenForUser(user)
        }
    }
}