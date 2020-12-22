import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwkAuthGuard } from 'src/auth/auth.guard';

//@UseGuards(JwkAuthGuard)
@Controller('middle')
export class MiddleController {

    @Get()
    async middletest(@Request() req) {
        
        console.log("CL session: ");
        console.log(req.session);
        console.log("CL passport: ");
        console.log(req._passport);

      return req.session
    }
}
