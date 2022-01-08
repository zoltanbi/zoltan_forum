import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';
import {Request, Response} from 'express';
import { RegisterDTO } from "./dto/request/register.dto";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {

    res.send("Hello there")
})

app.post("/register", (req: Request, res: Response) => {

    const body: RegisterDTO = req.body;

    // validate the body

    // validate if the email is already being used

    // store the user

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
