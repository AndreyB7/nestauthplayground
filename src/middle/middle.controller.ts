import { Controller, Request, Get } from '@nestjs/common';

@Controller('middle')
export class MiddleController {

    @Get()
    async login(@Request() req) {
        
        console.log("CL session: ");
        console.log(req.session);
        console.log("CL passport: ");
        console.log(req._passport);

      return 'return'
    }
}
