import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GuidanceHardwareController } from './controllers/guidance-hardware.controller';
import { GuidanceHardwareService } from './services/guidance-hardware.service';
import { MarsyTelemetryProxyService } from './services/marsy-telemetry-proxy/marsy-telemetry-proxy.service';
import { MarsyMissionProxyService } from './services/marsy-mission-proxy/marsy-mission-proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [GuidanceHardwareController],
  providers: [
    GuidanceHardwareService,
    MarsyTelemetryProxyService,
    MarsyMissionProxyService,
  ],
  exports: [GuidanceHardwareService],
})
export class GuidanceHardwareModule {}
