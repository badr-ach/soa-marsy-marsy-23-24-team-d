import { ErrorDto } from '../../shared/dto/error.dto';
import { HttpStatus } from '@nestjs/common';

export class RocketNotInFlightException extends ErrorDto {
  constructor(rocketId: string) {
    super(HttpStatus.BAD_REQUEST, `rocket ${rocketId.slice(-3)
        .toUpperCase()} is not inflight`);
  }
}
