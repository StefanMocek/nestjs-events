import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { Repository } from "typeorm";

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name)

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ) { }

    @Get()
    async findAll() {
        this.logger.log('Hit the find route');
        const events = await this.repository.find();
        this.logger.debug(`Found ${events.length} events`);
        return events;
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new NotFoundException()
        };
        return event;
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        })
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new NotFoundException()
        };
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        })
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {
        const event = await this.repository.findOneBy({ id: id });
        if (!event) {
            throw new NotFoundException()
        };
        await this.repository.remove(event);
    }
}
