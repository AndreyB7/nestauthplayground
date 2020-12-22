import {NextFunction, Request, Response} from "express";
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
//import {ConfigService} from "@nestjs/config";

import {createRedisClient} from "@paktolus/redis";
import {Injectable, NestMiddleware} from "@nestjs/common";

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {

  private middlaware;

  constructor() {
    this.middlaware = rateLimit({
      store: new RedisStore({
        client: createRedisClient("redis://127.0.0.1:6379"!),//this.configService.get<string>("REDIS_RATELIMIT_URL")!),
        expiry: 3600, // 1 expire after 1 hour
      }),
      windowMs: 3600, // 1 hour window
      max: 1000,//this.configService.get<string>("NODE_ENV") === "development" ? Infinity : 1000, // start blocking after 1000 requests
    })
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.middlaware(req, res, next);
  }
}
