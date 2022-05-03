import { User } from "./user";

export class Meeting {
 

    id!: number;
    date!: Date;
    location!: string;
    meetingUrl!: string;
    meetingId!: string;
    time!: string;
    users: string[] =["1"];
    published!:boolean;
}
