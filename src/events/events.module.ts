import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { EventsController } from "./controllers/events.controller";
import { EventsService } from "./services/events.service";
import { AttendeesService } from "./services/attendees.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event]),
    ],
    controllers: [EventsController],
    providers: [EventsService, AttendeesService]
})
export class EventsModule { }