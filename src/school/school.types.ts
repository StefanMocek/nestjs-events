import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum Gender {
    Male = 'Male',
    Female = 'Female'
};

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class EntityWithId {
    constructor(id: number) {
        this.id = id;
    };

    @Field(() => Int)
    id: number;
};