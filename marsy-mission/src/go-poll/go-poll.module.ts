import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoPollController } from './controllers/go-poll.controller';
import { MissionService } from './services/missions.service';
import { MarsyRocketProxyService } from './services/marsy-rocket-proxy/marsy-rocket-proxy.service';
import { MarsyWeatherProxyService } from './services/marsy-weather-proxy/marsy-weather-proxy.service';
import { SiteService } from './services/site.service';
import { SitesController } from './controllers/sites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Site, SiteSchema } from './schema/site.schema';
import { Mission, missionSchema } from './schema/mission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Site.name, schema: SiteSchema },
      { name: Mission.name, schema: missionSchema },
    ]),
    HttpModule,
  ],
  controllers: [GoPollController, SitesController],
  providers: [MarsyRocketProxyService, MarsyWeatherProxyService, SiteService, MissionService],
})
export class GoPollModule {}