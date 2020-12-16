import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwksStrategy } from './jwks.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwksStrategy: JwksStrategy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.jwksStrategy.validate(request);
  }
}