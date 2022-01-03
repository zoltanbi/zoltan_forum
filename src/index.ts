import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';

createConnection().then(async connection => {


}).catch(error => console.log(error));
