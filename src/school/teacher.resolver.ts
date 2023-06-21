import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Teacher } from "./teacher.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherAddInput } from "./input/teacher-add.input";
import { Logger } from "@nestjs/common";

@Resolver(() => Teacher)
export class TeacherResolver {
    private readonly logger = new Logger(TeacherResolver.name);

    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) { }

    @Query(() => [Teacher])
    public async reachers(): Promise<Teacher[]> {
        return await this.teacherRepository.find();
    }

    @Query(() => Teacher)
    public async teacher(
        @Args('id', { type: () => Int })
        id: number
    ): Promise<Teacher> {
        return await this.teacherRepository.findOneOrFail({
            where: {
                id
            }
        });
    }

    @Mutation(() => Teacher, { name: 'teacherAdd' })
    public async add(
        @Args('input', { type: () => TeacherAddInput })
        input: TeacherAddInput
    ): Promise<Teacher> {
        return await this.teacherRepository.save(new Teacher(input));
    }

    @ResolveField('subject')
    public async subjects(
        @Parent()
        teacher: Teacher
    ) {
        this.logger.debug(`@ResolveField subjects was called`);
        return await teacher.subjects;
    }
}