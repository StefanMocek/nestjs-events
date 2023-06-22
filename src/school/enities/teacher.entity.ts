import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { Subject } from './subject.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Gender } from '../school.types';
import { Course } from './course.entity';

@Entity()
@ObjectType()
export class Teacher {
    constructor(partial?: Partial<Teacher>) {
        Object.assign(this, partial);
    }
    @PrimaryGeneratedColumn()
    @Field({ nullable: true })
    id: number;
    @Column()
    @Field()
    name: string;
    @Column({
        type: 'enum',
        enum: Gender,
    })
    @Field(() => Gender)
    gender: Gender;
    @ManyToMany(() => Subject, (subject) => subject.teachers)
    @Field(() => [Subject])
    subjects: Promise<Subject[]>;

    @OneToMany(() => Course, (course) => course.teacher)
    @Field(() => [Course])
    courses: Promise<Course[]>;
}