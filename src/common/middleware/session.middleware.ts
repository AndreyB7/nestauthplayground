//import {NextFunction, Request, Response} from "express";
//import session from "express-session";
//import {ConfigService} from "@nestjs/config";

import {createRedisClient} from "@paktolus/redis";
import {Injectable, NestMiddleware} from "@nestjs/common";

const connectRedis = require('connect-redis');
const express = require("express");
const session = require("express-session");

@Injectable()
export class SessionMiddleware implements NestMiddleware {

  private middleware;

  constructor(){//private readonly configService: ConfigService) {
    this.middleware = session({
      cookie: {
        path: "/",
        httpOnly: true,
        secure: "production", //this.configService.get<string>("NODE_ENV") === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        signed: false,
        sameSite: "none",
      },
      name: "sid",
      resave: false,
      secret: "keyboard cat",//this.configService.get<string>("COOKIE_SESSION_SECRET")!,
      store: new (connectRedis(session))({client: createRedisClient("redis://127.0.0.1:6379"!)}),//new (connectRedis(session))({client: createRedisClient(this.configService.get<string>("REDIS_SESSION_URL")!)}),
      saveUninitialized: true,
      proxy: true,
    })
  }

  use(req, res, next): void {
    this.middleware(req, res, next);
    // console.log("session req:");
    // console.log(req);
      console.log("session res:");
      console.log(res)
  }
}
