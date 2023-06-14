import { Repository } from "typeorm";
import { EventsController } from "../controllers/events.controller";
import { EventsService } from "../services/events.service";
import { Event } from "../entity/event.entity";

describe('EventsController tests', () => {
    let eventsController: EventsController;
    let eventsService: EventsService;
    let eventRepository: Repository<Event>;

    beforeEach(() => {
        eventsService = new EventsService(eventRepository);
        eventsController = new EventsController(eventsService)
    })

});