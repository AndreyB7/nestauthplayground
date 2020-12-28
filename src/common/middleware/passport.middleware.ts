import {NextFunction, Request, Response} from "express";
import {Injectable, NestMiddleware} from "@nestjs/common";

//import passport from "passport";
const passport = require('passport');

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  
  private initialize;
  private session;

  constructor() {
    this.initialize = passport.initialize();
    this.session = passport.session();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.initialize(req, res, next);
    //res.cookie("key", "!!!")
    //this.session(req, res, next);
  }
}
