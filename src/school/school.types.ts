import { registerEnumType } from "@nestjs/graphql";

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

registerEnumType(Gender, { name: 'Gender' })