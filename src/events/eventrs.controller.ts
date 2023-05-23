import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {}

    @Get(':id')
    findOne(@Param('id') id) {}

    @Post()
    create(@Body() input) {}

    @Patch(':id')
    update(@Param('id') id, @Body() input) {}

    @Delete(':id')
    delete(@Param('id') id) {}
}
