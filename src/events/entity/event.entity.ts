import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.entity";
import { User } from "../../auth/entity/user.entity";

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    description: string;

    @Column({ name: 'when_date' })
    when: Date;

    @Column()
    address: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event)
    attendees: Attendee[];

    @ManyToOne(() => User, (user) => user.organized)
    @JoinColumn({ name: 'organizerId' })
    organizer: User;

    @Column()
    organizerId: number;

    attendeeCount?: number;
    attendeeRejected?: number;
    attendeeMaybe?: number;
    attendeeAccepted?: number;
}