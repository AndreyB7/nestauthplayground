import { Module } from '@nestjs/common';
import { MiddleController } from './middle.controller';

@Module({
  controllers: [MiddleController],
})
export class MiddleModule {}
