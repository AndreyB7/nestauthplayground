import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    getHello(): string {
        return 'Auth!';
      }

    async validateJwks(headers): Promise<any> {
        const user = headers.jwks.decode;
        return false;
    }
}