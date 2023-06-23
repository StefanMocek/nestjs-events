import { IsEmail, Length } from "class-validator";
import { IsRepeated } from "../../validation/is-repeated.constraint";

export class CreateUserDto {
    @Length(5)
    userName: string;

    @Length(8)
    password: string;

    @Length(8)
    @IsRepeated('password')
    retypedPassword: string;

    @Length(2)
    firstName: string;

    @Length(2)
    lastName: string;

    @IsEmail()
    email: string;
}