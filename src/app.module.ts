import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/entity/event.entity';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'temporaryExample',
    database: 'nest-events',
    entities: [Event],
    synchronize: true
  }),
  EventsModule
],
  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppService
  }, { 
    provide: 'APP_NAME',
    useValue: 'Nest Events Backend'
  }],
})
export class AppModule { }
