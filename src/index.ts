import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';
import {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {

    res.send("Hello there")
})

app.post("/register", (req: Request, res: Response) => {

    const body = req.body;

    console.log(body);
    
    res.json({
        token: "Dummy token",
        refreshToken: "dummy-refreshToken",
        user: {
            id: 1,
            username: "dummy"
        }
    })
})

app.listen(4000, () => console.log("Listening on this port", 4000))



createConnection().then(async connection => {


}).catch(error => console.log(error));
