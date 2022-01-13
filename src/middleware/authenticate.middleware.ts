import { Request, Response, NextFunction, response } from "express"
import { Unauthorized } from "../error/unauthorized";

export default function(req: Request,res: Response,next: NextFunction) {
    
    if (!req.session || !req.session.user) throw new Unauthorized("You are not logged in");

    next();
};

