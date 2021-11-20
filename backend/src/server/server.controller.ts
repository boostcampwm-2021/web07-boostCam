import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Session,
  HttpException,
} from '@nestjs/common';

import { ServerService } from './server.service';
import { Server } from './server.entity';
import { LoginGuard } from '../login/login.guard';
import RequestServerDto from './dto/RequestServerDto';
import { ExpressSession } from '../types/session';
import ResponseEntity from '../common/response-entity';

@Controller('/api/servers')
export class ServerController {
  constructor(private serverService: ServerService) {
    this.serverService = serverService;
  }

  @Get('list') async findAll(): Promise<Server[]> {
    const serverList = await this.serverService.findAll();
    return Object.assign({
      data: serverList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get('/:id') async findOne(@Param('id') id: number): Promise<Server> {
    const foundServer = await this.serverService.findOne(id);
    return Object.assign({
      data: foundServer,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Post()
  @UseGuards(LoginGuard)
  async saveServer(
    @Session()
    session: ExpressSession,
    @Body() requestServerDto: RequestServerDto,
  ): Promise<ResponseEntity<number>> {
    try {
      const user = session.user;
      const newServer = await this.serverService.create(user, requestServerDto);
      return ResponseEntity.created(newServer.id);
    } catch (error) {
      throw new HttpException(error.response, 403);
    }
  }

  @Patch('/:id') async updateUser(
    @Param('id') id: number,
    @Body() server: Server,
  ): Promise<string> {
    await this.serverService.updateServer(id, server);
    return Object.assign({
      data: { ...server },
      statusCode: 200,
      statusMsg: `updated successfully`,
    });
  }

  @Delete('/:id') async deleteUser(@Param('id') id: number): Promise<string> {
    await this.serverService.deleteServer(id);
    return Object.assign({
      data: { id },
      statusCode: 200,
      statusMsg: `deleted successfully`,
    });
  }
}
