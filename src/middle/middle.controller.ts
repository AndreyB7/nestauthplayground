import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwksAuthGuard } from 'src/auth/jwks.auth.guard';

@Controller('middle')
export class MiddleController {
  
    @UseGuards(JwksAuthGuard)  
    @Get()
    middletest(@Request() req) {
        
        console.log("CL session: ");
        console.log(req.session);
        console.log("CL passport: ");
        console.log(req._passport);

      return req.user
    }
}
