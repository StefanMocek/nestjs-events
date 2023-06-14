import { Repository } from "typeorm";
import { EventsController } from "../controllers/events.controller";
import { EventsService } from "../services/events.service";
import { Event } from "../entity/event.entity";
import { ListEvents } from "../input/list-events";

describe('EventsController tests', () => {
    let eventsController: EventsController;
    let eventsService: EventsService;
    let eventRepository: Repository<Event>;

    beforeEach(() => {
        eventsService = new EventsService(eventRepository);
        eventsController = new EventsController(eventsService)
    })

    it('Should return list of events', async () => {
        const result = {
            first: 1,
            last: 1,
            limit: 10,
            data: []
        };

        // eventsService.getEventsWithAttendeeCountFilteredPaginated 
        //     = jest.fn().mockImplementation((): any => result);

        const spy = jest
            .spyOn(eventsService, 'getEventsWithAttendeeCountFilteredPaginated')
            .mockImplementation((): any => result);
        
        expect(await eventsController.findAll(new ListEvents))
            .toEqual(result)
        expect(spy)
            .toBeCalledTimes(1);
    })
});