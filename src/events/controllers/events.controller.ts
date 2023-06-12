import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, HttpCode, Logger, NotFoundException, Param, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateEventDto } from "../input/create-event.dto";
import { UpdateEventDto } from "../input/update-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "../entity/event.entity";
import { Repository } from "typeorm";
import { EventsService } from "../services/events.service";
import { ListEvents } from "../input/list-events";
import { CurrentUser } from "../../auth/decorators/current-user.dacorator";
import { User } from "../../auth/entity/user.entity";
import { AuthGuardJwt } from "../../auth/decorators/auth-guard.jwt";

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsController {
    private readonly logger = new Logger(EventsController.name)

    constructor(
        private readonly eventsService: EventsService
    ) { }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() filter: ListEvents) {
        const events = await this.eventsService
            .getEventsWithAttendeeCountFilteredPaginated(
                filter,
                {
                    total: true,
                    currentPage: filter.page,
                    limit: 10
                }
            );
        return events;
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id') id) {
        const event = await this.eventsService.getEventWithAttendeeCount(id);
        if (!event) {
            throw new NotFoundException()
        };
        return event;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(
        @Body() input: CreateEventDto,
        @CurrentUser() user: User
    ) {
        return await this.eventsService.createEvent(input, user)
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') id,
        @Body() input: UpdateEventDto,
        @CurrentUser() user: User
    ) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException()
        };
        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to change this event`)
        }
        return await this.eventsService.updateEvent(event, input)
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async delete(
        @Param('id') id,
        @CurrentUser() user: User
    ) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException()
        };
        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to remove this event`)
        }
        await this.eventsService.deleteEvent(id)
    }
}