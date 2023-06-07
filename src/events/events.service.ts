import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./entity/event.entity";
import { Logger } from "@nestjs/common";

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

    public async getEvent(id: number): Promise<Event> {
        const guery =  this.getEventsBaseQuery()
            .andWhere('e.id = :id', { id });
            
        this.logger.debug(guery.getSql());

        return await guery.getOne();
    }
}