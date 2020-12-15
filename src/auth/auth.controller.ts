import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
    return this.authService.getHello();
    }

    //@UseGuards(AuthGuard('jwks'))
    @Post('google')
    async login(@Request() req) {
        return req.headers;
      }

}
