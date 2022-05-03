import { User } from "./user";

export interface Meetings{
    id: number;
    date: string;
    location: string;
    meetingUrl: string;
    meetingId: string;
    time: string;
    users:User[];
    published:boolean;
}