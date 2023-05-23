import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {}

    @Get(':id')
    findOne(@Param('id') id) {}

    @Post()
    create(@Body() input: CreateEventDto) {}

    @Patch(':id')
    update(@Param('id') id, @Body() input) {}

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id) {}
}
