import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Event } from "../../events/entity/event.entity";
import { Expose } from "class-transformer";
import { Attendee } from "../../events/entity/attendee.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    @Field(() => Int)
    id: number;

    @Column({ unique: true })
    @Expose()
    @Field()
    userName: string;

    @Column()
    password: string;

    @Column({ unique: true })
    @Expose()
    @Expose()
    email: string;

    @Column()
    @Expose()
    @Expose()
    firstName: string;

    @Column()
    @Expose()
    @Expose()
    lastName: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    @Expose()
    profile: Profile

    @OneToMany(() => Event, (event) => event.organizer)
    @Expose()
    organized: Event[];

    @OneToMany(() => Attendee, (attendee) => attendee.user)
    attended: Attendee[];
}