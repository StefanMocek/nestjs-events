import { Query, Resolver } from "@nestjs/graphql";
import { Teacher } from "./teacher.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Resolver(() => Teacher)
export class TeacherResolver {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) { }

    @Query(() => [Teacher])
    public async reachers(): Promise<Teacher[]> {
        return await this.teacherRepository.find({
            relations: ['subjects'],
        });
    }
}