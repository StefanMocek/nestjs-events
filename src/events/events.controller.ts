import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entity/event.entity";
import { Repository } from "typeorm";

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ) { }

    @Get()
    async findAll() {
        return await this.repository.find()
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.repository.findOneBy({ id: id });
    }

    @Post()
    async create(@Body(new ValidationPipe({groups: ['create']})) input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        })
    }

    @Patch(':id')
    async update(@Param('id') id, @Body(new ValidationPipe({groups: ['update']})) input: UpdateEventDto) {
        const event = await this.repository.findOneBy({ id: id });
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
        await this.repository.remove(event);
    }
}
