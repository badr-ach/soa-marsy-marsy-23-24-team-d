import { Body, Controller, Get, Param, Post, Put, Logger } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

const logger = new Logger('RocketController');

import { RocketService } from '../services/rocket.service';
import { RocketDto } from '../dto/rocket.dto';
import { AddRocketDto } from '../dto/add-rocket.dto';
import { RocketNameNotFoundException } from '../exceptions/rocket-name-not-found.exception';
import { RocketAlreadyExistsException } from '../exceptions/rocket-already-exists.exception';
import { UpdateRocketStatusDto } from '../dto/update-rocket.dto';
import { SendStatusDto } from '../dto/send-status.dto';

@ApiTags('rockets')
@Controller('/rockets')
export class RocketController {
  constructor(private readonly rocketService: RocketService) {}

  @ApiOkResponse({ type: RocketDto, isArray: true })
  @Get()
  async listAllRockets(): Promise<RocketDto[]> {
    return this.rocketService.findAll();
  }

  @ApiParam({ name: 'rocketId' })
  @ApiOkResponse({ type: RocketDto })
  @ApiNotFoundResponse({
    type: RocketNameNotFoundException,
    description: 'Rocket not found',
  })
  @Get('id/:rocketId')
  async getRocketById(
    @Param() params: { rocketId: string },
  ): Promise<RocketDto> {
    const rocketId = params.rocketId; // Access the 'rocketName' property
    return this.rocketService.findRocketById(rocketId);
  }
  @ApiParam({ name: 'rocketName' })
  @ApiOkResponse({ type: RocketDto })
  @ApiNotFoundResponse({
    type: RocketNameNotFoundException,
    description: 'Rocket not found',
  })
  @Get(':rocketName')
  async getRocketByName(
    @Param() params: { rocketName: string },
  ): Promise<RocketDto> {
    const rocketName = params.rocketName; // Access the 'rocketName' property
    return this.rocketService.findRocketByName(rocketName);
  }

  @ApiParam({ name: 'rocketId' })
  @ApiOkResponse({ type: SendStatusDto, description: 'The rockets status.' })
  @Get('id/:rocketId/status')
  async retrieveRocketStatusById(
    @Param() params: { rocketId: string },
  ): Promise<SendStatusDto> {
    const rocketId = params.rocketId; // Access the 'rocketId' property
    const status = await this.rocketService.getRocketStatusById(rocketId);
    return SendStatusDto.SendStatusDtoFactory(status);
  }
  @ApiParam({ name: 'rocketName' })
  @ApiOkResponse({ type: SendStatusDto, description: 'The rockets status.' })
  @Get(':rocketName/status')
  async retrieveRocketStatus(
    @Param() params: { rocketName: string },
  ): Promise<SendStatusDto> {
    const rocketName = params.rocketName; // Access the 'rocketId' property
    const status = await this.rocketService.getRocketStatus(rocketName);
    logger.log(`status for ${rocketName} is ${status}`);
    return SendStatusDto.SendStatusDtoFactory(status);
  }

  @ApiBody({ type: AddRocketDto })
  @ApiCreatedResponse({
    type: RocketDto,
    description: 'The rocket has been successfully added.',
  })
  @ApiConflictResponse({
    type: RocketAlreadyExistsException,
    description: 'Rocket already exists',
  })
  @Post()
  async addRocket(@Body() addRocketDto: AddRocketDto): Promise<RocketDto> {
    return await this.rocketService.create(addRocketDto);
  }

  @ApiParam({ name: 'rocketName' })
  @ApiBody({ type: UpdateRocketStatusDto })
  @ApiOkResponse({
    type: RocketDto,
    description: 'The rocket status has been successfully updated.',
  })
  @ApiNotFoundResponse({
    type: RocketNameNotFoundException,
    description: 'Rocket not found',
  })
  @Put(':rocketName/status')
  async updateRocketStatus(
    @Param() params: { rocketName: string },
    @Body() updateStatusDto: UpdateRocketStatusDto, // Receive as enum
  ): Promise<RocketDto> {
    const rocketName = params.rocketName; // Access the 'rocketId' property
    const newStatus = updateStatusDto.status; // Use the enum value
    return await this.rocketService.updateStatus(rocketName, newStatus);
  }

  @ApiParam({ name: 'rocketId' })
  @ApiBody({ type: UpdateRocketStatusDto })
  @ApiOkResponse({
    type: RocketDto,
    description: 'The rocket status has been successfully updated.',
  })
  @ApiNotFoundResponse({
    type: RocketNameNotFoundException,
    description: 'Rocket not found',
  })
  @Put('id/:rocketId/status')
  async updateRocketStatusById(
    @Param() params: { rocketId: string },
    @Body() updateStatusDto: UpdateRocketStatusDto, // Receive as enum
  ): Promise<RocketDto> {
    const rocketId = params.rocketId; // Access the 'rocketId' property
    const newStatus = updateStatusDto.status; // Use the enum value
    return await this.rocketService.updateStatusById(rocketId, newStatus);
  }
}
