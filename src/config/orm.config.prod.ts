import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "./../events/entity/event.entity";
import { Attendee } from "../events/entity/attendee.entity";
import { User } from "../auth/entity/user.entity";
import { Profile } from "../auth/entity/profile.entity";

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event, Attendee, User, Profile],
        synchronize: false,
        dropSchema: false
    }))