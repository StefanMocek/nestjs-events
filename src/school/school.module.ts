import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject, Teacher } from './enities';
import { TeacherResolver } from "./resolvers/teacher.resolver";
import { CourseResolver } from "./resolvers/course.resolver";
import { SubjectResolver } from "./resolvers/subject.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher])],
  providers: [
    TeacherResolver,
    CourseResolver,
    SubjectResolver,
  ],
  controllers: []
})
export class SchoolModule { }