import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Event, PaginatedEvents } from "./entity/event.entity";
import { Injectable, Logger } from "@nestjs/common";
import { AttendeeAnswerEnum } from "./entity/attendee.entity";
import { ListEvents, WhenEventFilter } from "./input/list-events";
import { PaginationOptions, paginate } from "../pagination/paginator";
import { CreateEventDto } from "./input/create-event.dto";
import { User } from "../auth/entity/user.entity";
import { UpdateEventDto } from "./input/update-event.dto";

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
                        { answer: AttendeeAnswerEnum.Accepted }
                    )
            )
            .loadRelationCountAndMap(
                'e.attendeeMaybe',
                'e.attendees',
                'attendee',
                (qb) => qb
                    .where(
                        'attendee.answer = :answer',
                        { answer: AttendeeAnswerEnum.Maybe }
                    )
            )
            .loadRelationCountAndMap(
                'e.attendeeRejected',
                'e.attendees',
                'attendee',
                (qb) => qb
                    .where(
                        'attendee.answer = :answer',
                        { answer: AttendeeAnswerEnum.Rejected }
                    )
            )
    }

    private async getEventWithAttendeeCountFiltered(filter?: ListEvents) {
        let query = this.getEventWithAttendeeCountQuery();

        if (!filter) {
            return await query;
        }

        if (filter.when) {
            if (filter.when == WhenEventFilter.Today) {
                query = query.andWhere(
                    `e.when >= CURDATE() AND e.when <= CURDATE() + INTERVAL 1 DAY`
                )
            }
        }

        if (filter.when) {
            if (filter.when == WhenEventFilter.Tommorow) {
                query = query.andWhere(
                    `e.when >= CURDATE() + INTERVAL 1 DAY AND e.when <= CURDATE() + INTERVAL 2 DAY`
                )
            }
        }

        if (filter.when) {
            if (filter.when == WhenEventFilter.ThisWeek) {
                query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1)')
            }
        }

        if (filter.when) {
            if (filter.when == WhenEventFilter.NextWeek) {
                query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1) + 1')
            }
        }

        return await query;
    }

    public async getEventsWithAttendeeCountFilteredPaginated (
        filter: ListEvents,
        paginationOptions: PaginationOptions
    ): Promise<PaginatedEvents> {
        return await paginate(
            await this.getEventWithAttendeeCountFiltered(filter),
            paginationOptions
        )
    }

    public async getEvent(id: number): Promise<Event | undefined> {
        const guery = this.getEventWithAttendeeCountQuery()
            .andWhere('e.id = :id', { id });

        this.logger.debug(guery.getSql());

        return await guery.getOne();
    }

    public async createEvent(input: CreateEventDto, user: User): Promise<Event> {
        return await this.eventsRepository.save({
            ...input,
            organizer: user,
            when: new Date(input.when)
        })
    }

    public async updateEvent(event: Event, input: UpdateEventDto): Promise<Event> {
        return await this.eventsRepository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        })
    }

    public async deleteEvent(id: number): Promise<DeleteResult> {
        return await this.eventsRepository
            .createQueryBuilder('e')
            .delete()
            .where('id = :id', { id })
            .execute();
    }

    public async getEventsOrganizedByUserIdPaginated (
        userId: number,
        paginationOptions: PaginationOptions
    ): Promise<PaginatedEvents> {
        return await paginate<Event>(
            this.getEventsOrganizedByUserIdQuery(userId),
            paginationOptions
        );
    }

    private getEventsOrganizedByUserIdQuery (
        userId: number
    ) {
        return this.getEventsBaseQuery()
            .where('e.organizerId = :userId', {userId});
    }
}