import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./entity/event.entity";
import { Injectable, Logger } from "@nestjs/common";
import { AttendeeAnswerEnum } from "./entity/attendee.entity";

@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name);

    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>
    ) { }

    private getEventsBaseQuery() {
        return this.eventsRepository
            .createQueryBuilder('e')
            .orderBy('e.id', 'DESC');
    }

    public getEventWithAttendeeCountQuery() {
        return this.getEventsBaseQuery()
            .loadRelationCountAndMap(
                'e.attendeeCount', 'e.attendees'
            )
            .loadRelationCountAndMap(
                'e.attendeeAccepted',
                'e.attendees',
                'attendee',
                (qb) => qb
                    .where(
                        'attendee.answer = :answer',
                        { answer: AttendeeAnswerEnum.Accepted}
                    )
            )
    }

    public async getEvent(id: number): Promise<Event | undefined> {
        const guery =  this.getEventWithAttendeeCountQuery()
            .andWhere('e.id = :id', { id });
            
        this.logger.debug(guery.getSql());

        return await guery.getOne();
    }
}