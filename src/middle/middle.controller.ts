import { Controller, Request, Get } from '@nestjs/common';
const passport = require('passport');

@Controller('middle')
export class MiddleController {
    private session;
    constructor() {
        this.session = passport.session();
      }
    @Get()
    async login(@Request() req) {
        
        console.log("CL session: ");
        console.log(req.session);
        console.log("CL passport: ");
        console.log(req._passport);

      return req.session
    }
}
