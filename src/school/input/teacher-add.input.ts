import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class TeacherAddInput {
    @Field()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}