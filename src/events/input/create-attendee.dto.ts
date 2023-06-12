import { IsEnum } from "class-validator";
import { AttendeeAnswerEnum } from "../entity/attendee.entity";

export class CreateAttendeeDto {
    @IsEnum(AttendeeAnswerEnum)
    asnwer: AttendeeAnswerEnum;
}