import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, ParseIntPipe, Put, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { EventsService } from "../services/events.service";
import { AttendeesService } from "../services/attendees.service";
import { CreateAttendeeDto } from "../input/create-attendee.dto";
import { User } from "../../auth/entity/user.entity";
import { CurrentUser } from "../../auth/decorators/current-user.dacorator";
import { AuthGuardJwt } from "../../auth/decorators/auth-guard.jwt";

@Controller('events-attendance')
@SerializeOptions({ strategy: 'excludeAll' })
export class CurrentUserEventAttendanceController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly attendeesService: AttendeesService
    ) { }

    @Get()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(
        @CurrentUser() user: User,
        @Query('page', ParseIntPipe) page = 1
    ) {
        return await this.eventsService.getEventsAttendedByUserIdPaginated(
            user.id,
            { currentPage: page, limit: 5 }
        )
    }

    @Get('/:eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(
        @Param('eventId', ParseIntPipe) eventId: number,
        @CurrentUser() user: User
    ) {
        const attendee = await this.attendeesService.findOneByEventIdAndUserId(eventId, user.id)

        if (!attendee) {
            throw new NotFoundException()
        }

        return attendee;
    }

    @Put('/:eventId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async createOrUpdate(
        @Param('eventId', ParseIntPipe) eventId: number,
        @Body() input: CreateAttendeeDto,
        @CurrentUser() user: User
    ) {
        return await this.attendeesService.createOrUpdate(input, eventId, user.id)
    }
}