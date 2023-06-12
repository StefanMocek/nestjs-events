import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.entity";
import { User } from "../../auth/entity/user.entity";
import { Expose } from "class-transformer";
import { PaginationResult } from "src/pagination/paginator";

@Entity('events')
export class Event {
    constructor(partial?: Partial<Event>) {
        Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ length: 100 })
    @Expose()
    name: string;

    @Column()
    @Expose()
    description: string;

    @Column({ name: 'when_date' })
    @Expose()
    when: Date;

    @Column()
    @Expose()
    address: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event, {
        cascade: true
    })
    @Expose()
    attendees: Attendee[];

    @ManyToOne(() => User, (user) => user.organized)
    @JoinColumn({ name: 'organizerId' })
    organizer: User;

    @Column({ nullable: true })
    organizerId: number;

    @Expose()
    attendeeCount?: number;
    @Expose()
    attendeeRejected?: number;
    @Expose()
    attendeeMaybe?: number;
    @Expose()
    attendeeAccepted?: number;
}

export type PaginatedEvents = PaginationResult<Event>;