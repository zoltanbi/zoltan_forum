// @ts-ignore
import session from 'express-session';

declare module "express-session" {
    export interface SessionData {
        clientId: string;
        myNum: number;
    }
}