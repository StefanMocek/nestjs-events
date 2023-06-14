import { Repository } from "typeorm";
import { Test } from '@nestjs/testing';
import { EventsService } from "../services/events.service";
import { Event } from "../entity/event.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('EventService', () => {
    let service: EventsService;
    let repository: Repository<Event>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: getRepositoryToken(Event),
                    useValue: {
                        save: jest.fn(),
                        createQueryBuilder: jest.fn(),
                        delete: jest.fn(),
                        where: jest.fn(),
                        execute: jest.fn()
                    }
                }
            ]
        }).compile();

        service = module.get<EventsService>(EventsService);
        repository = module.get<Repository<Event>>(getRepositoryToken(Event));
    });

    describe('updateEvent', () => {
        it('Should update the event', async () => {
            const repoSpy = jest.spyOn(repository, 'save')
                .mockResolvedValue({ id: 1 } as Event);

            // only updateEvent method isnt a mock
            expect(service.updateEvent(new Event({ id: 1 }), { name: 'test name' }))
                .resolves.toEqual({ id: 1 })
            expect(repoSpy).toBeCalledWith({ id: 1, name: 'test name' })
        });
    });
});