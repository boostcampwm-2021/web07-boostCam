import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';

import { ServerService } from './server.service';
import { Server } from './server.entity';

@Controller('api/server')
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
  @Get(':id') async findOne(@Param('id') id: string): Promise<Server> {
    const foundServer = await this.serverService.findOne(+id);
    return Object.assign({
      data: foundServer,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post() async saveServer(@Body() server: Server): Promise<string> {
    await this.serverService.addServer(server);
    return Object.assign({
      data: { ...server },
      statusCode: 200,
      statusMsg: `saved successfully`,
    });
  }
  @Patch(':id') async updateUser(
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
  @Delete(':id') async deleteUser(@Param('id') id: string): Promise<string> {
    await this.serverService.deleteServer(+id);
    return Object.assign({
      data: { id },
      statusCode: 200,
      statusMsg: `deleted successfully`,
    });
  }
}
