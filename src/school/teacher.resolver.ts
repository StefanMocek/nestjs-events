import { Args, Int, Query, Resolver } from "@nestjs/graphql";
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

    @Query(() => Teacher)
    public async teacher(
        @Args('id', { type: () => Int })
        id: number
    ): Promise<Teacher> {
        return await this.teacherRepository.findOneOrFail({
            where: {
                id
            },
            relations: ['subjects'],
        });
    }
}