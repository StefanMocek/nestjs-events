import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
    @Field()
    userName: string;

    @Field()
    password: string
}