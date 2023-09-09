import { Module } from '@nestjs/common';
import { PhysicianService } from './physician.service';
import { PhysicianController } from './physician.controller';

@Module({
  controllers: [PhysicianController],
  providers: [PhysicianService],
})
export class PhysicianModule {}
