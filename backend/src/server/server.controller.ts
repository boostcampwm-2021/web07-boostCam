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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { ServerService } from './server.service';
import { Server } from './server.entity';
import { LoginGuard } from '../login/login.guard';
import RequestServerDto from './dto/RequestServerDto';
import { ExpressSession } from '../types/session';
import ResponseEntity from '../common/response-entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../image/image.service';

@Controller('/api/servers')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private imageService: ImageService,
  ) {}

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
  @UseInterceptors(FileInterceptor('icon'))
  async saveServer(
    @Session()
    session: ExpressSession,
    @Body() requestServerDto: RequestServerDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ResponseEntity<number>> {
    try {
      let imgUrl: string;

      if (icon !== undefined && icon.mimetype.substring(0, 5) === 'image') {
        const uploadedFile = await this.imageService.uploadFile(icon);
        imgUrl = uploadedFile.Location;
      }
      const user = session.user;
      const newServer = await this.serverService.create(
        user,
        requestServerDto,
        imgUrl,
      );
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
