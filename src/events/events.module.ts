import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { AttendeesService } from "./attendees.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event]),
    ],
    controllers: [EventsController],
    providers: [EventsService, AttendeesService]
})
export class EventsModule { }