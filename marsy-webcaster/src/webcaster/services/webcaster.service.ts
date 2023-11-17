import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Webcasting } from '../schema/webcasting.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebCasterService {
  private readonly logger: Logger = new Logger(WebCasterService.name);

  constructor(
    @InjectModel(Webcasting.name) private webcastingModel: Model<Webcasting>,
  ) {}

  async announceEvent(event: EventDto) {
    const eventString: string = `News from ${event.rocketId
      .slice(-3)
      .toUpperCase()} ${event.event} (us 15)`;

    const rocketId = event.rocketId;
    try {
      const findEvent = await this.webcastingModel.findOne({
        rocket: rocketId,
      });

      if (findEvent) {
        await this.webcastingModel.updateOne(
          { rocket: rocketId },
          { $push: { events: eventString } },
        );
      } else {
        await this.webcastingModel.create({
          rocket: rocketId,
          events: [eventString],
        });
      }

      this.logger.debug(eventString);
    } catch (error) {
      this.logger.error(`An error occurred: ${error.message}`);
    }
  }

  async findAll() {
    const allEvents: Webcasting[] = await this.webcastingModel.find().lean();
    return Promise.all(allEvents);
  }
}
