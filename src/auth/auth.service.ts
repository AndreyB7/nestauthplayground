import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ExtractJwt } from 'passport-jwt';

const jsonwebtoken = require('jsonwebtoken');
const jwksClient = require("jwks-rsa");

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    getHello(): string {
        return 'Auth!';
      }
    
    getUser(req): any {
        const GetJwt = ExtractJwt.fromAuthHeaderAsBearerToken();
        const jwt = GetJwt(req);
        const jwtdata = this.jwtService.decode(jwt);
        return jwtdata;
    };

    async validateJwks(request): Promise<any> {
        
        const client = jwksClient({
            cache: true, // Default Value
            cacheMaxEntries: 5, // Default value
            cacheMaxAge: 600000, // Defaults to 10m
            jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
          });

        const kid = request.headers.kid; // 'RkI5MjI5OUY5ODc1N0Q4QzM0OUYzNkVGMTJDOUEzQkFCOTU3NjE2Rg';
        let valid = false;
        console.log('Before getSigningKey:' + valid)
        client.getSigningKey(kid, (err, key, valid) => {
            const signingKey = key ? key.getPublicKey() : undefined;
            valid = signingKey?true:false;
            console.log('In getSigningKey:' + valid)
         });
        console.log('After getSigningKey:' + valid)
        return valid;
    }
}

//datakey: eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxOTdiZjJlODdiZDE5MDU1NzVmOWI2ZTVlYjQyNmVkYTVkNTc0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ1NjIwMDA4MTc0MjEwOTA4OTEiLCJlbWFpbCI6IjAxMjk1MDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI4SDBPUmdqRlQxTlFhNjh2bzdfcGp3IiwiaWF0IjoxNjA3OTUzODk3LCJleHAiOjE2MDc5NTc0OTd9.RKC21Sz2P_3xW0ZhBwXIfUsYcp0PuyTRAd6iEEkZB275KuiTnePBM9YaG31tcCDw6F2c_FNGzFpF0U8xZHNHR0q6qkF4DS-iXBoe90japhr4-5XqutFwO_eiFdG0ujtMI84um850wsaqTN99OrwyhlX3_dfZvPxV9tmByp1g3du_F9EbEjto7-bHZnxycxv426tStuAE_XXVIZCQritAi9cD1CpxsvKIqH3gu9gdA2utPcY2qSX9NVSi5_Tey_QxwdJ8Rp8crEP0_8sdqmZfjAIvoDWZYLYyJJQPEJD2Sv1djL3T2mFwdSAUf_3MW-gtoMwi7CNLXnlhP1PC3f9gzw