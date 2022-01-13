//import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";
import * as express from 'express';
import { UserDTO } from './dto/response/user.dto';
// import {Request, Response} from 'express';
// import { RegisterDTO } from "./dto/request/register.dto";
// import { Database } from "./database";
// import { PasswordHash } from "./security/passwordHash";
// import { AuthenticationDTO } from "./dto/response/authentication.dto";
// import { UserDTO } from "./dto/response/user.dto";
// import { EntityToDTO } from "./util/entityToDTO";
// import { LoginDTO } from "./dto/request/login.dto";
const session = require('express-session');
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);

const app = express();

declare module "express-session" {
    export interface SessionData {
        user: UserDTO;
    }
}

// const RedisStore = connectRedis(session);
const redisClient = new Redis();

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: 'secret tba to encrypt session',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, // production should be true to transmit only through https
        httpOnly: true, // prevents client side js from reading cookie
        maxAge: 1000 * 60 * 30
    }
}));

app.post('/login', (req, res) => {
    // @ts-ignore
    const {email, password} = req;

    req.session.clientId = 'abcdef';
    req.session.myNum = 5;

    res.json('you are logged in');
});

app.use((req, res, next) => {
    if(!req.session || !req.session.clientId) {
        const err = new Error('You shall not pass');
        // @ts-ignore
        err.statusCode = 401;
        next(err);
    }
    next();
});

app.get('/profile', (req, res) => {
    res.json(req.session);
})

//app.use(express.json());

// Database.initialize();

// app.get("/", (req: Request, res: Response) => {

//     res.send("Hello there")
// })

// app.post("/register", async (req: Request, res: Response) => {

//     try {
//         const body: RegisterDTO = req.body;

//         // check if email is set and represents a valid email format

//         // validate the body
//         if(body.password !== body.repeatPassword)
//             throw new Error("repeat password does not match password");

//         // validate if the email is already being used
//         if(await Database.userRepository.findOne({email: body.email}))
//             throw new Error("e-mail is already being used");

//         // store the user
//         const user = new User();
//         user.username = body.username;
//         user.email = body.email;
//         user.password = await PasswordHash.hashPassword(body.password);
//         user.age = body.age;

//         await Database.userRepository.save(user);

//         const authenticationDTO = new AuthenticationDTO();
//         const userDTO: UserDTO = EntityToDTO.userToDTO(user);

//         authenticationDTO.user = userDTO;
//         authenticationDTO.test = "test123";

//         res.json(authenticationDTO);

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
    
// })

app.listen(4000, () => console.log("Listening on this port", 4000))

// createConnection().then(async connection => {


// }).catch(error => console.log(error));
