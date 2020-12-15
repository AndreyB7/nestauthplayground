import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    getHello(): string {
        return 'Auth!';
      }

    async validateJwks(request): Promise<any> {
        console.log(request);
        const isvalid = true;
        return isvalid;
    }
}