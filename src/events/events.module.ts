import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { EventsController } from "./controllers/events.controller";
import { EventsService } from "./services/events.service";
import { AttendeesService } from "./services/attendees.service";
import { EventsOrganizedByUserController } from "./controllers/events-organized-by-user.controller";
import { CurrentUserEventAttendanceController } from "./controllers/current-user-event-attendance.controller";
import { EventsAttendeesController } from "./controllers/events-attendees.controller";
import { Attendee } from "./entity/attendee.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Attendee]),
    ],
    controllers: [
        EventsController,
        EventsAttendeesController,
        EventsOrganizedByUserController,
        CurrentUserEventAttendanceController
    ],
    providers: [EventsService, AttendeesService]
})
export class EventsModule { }