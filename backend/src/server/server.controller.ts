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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ServerService } from './server.service';
import { LoginGuard } from '../login/login.guard';
import RequestServerDto from './dto/request-server.dto';
import { ExpressSession } from '../types/session';
import ResponseEntity from '../common/response-entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../image/image.service';
import ServerWithUsersDto from './dto/response-server-users.dto';
import { CamService } from '../cam/cam.service';
import { ResponseCamDto } from '../cam/cam.dto';

@Controller('/api/servers')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private imageService: ImageService,
    private camService: CamService,
  ) {}

  @Get('/:id/users') async findOneWithUsers(
    @Param('id') id: number,
  ): Promise<ResponseEntity<ServerWithUsersDto>> {
    const serverWithUsers = await this.serverService.findOneWithUsers(id);
    return ResponseEntity.ok(serverWithUsers);
  }

  @Get('/:id/cam') async findCams(
    @Param('id') id: number,
  ): Promise<ResponseEntity<ResponseCamDto[]>> {
    const cam = await this.camService.getCamList(id);
    return ResponseEntity.ok(cam);
  }

  @Get('/:id/code') async findCode(
    @Param('id') id: number,
  ): Promise<ResponseEntity<string>> {
    const code = await this.serverService.findCode(id);
    return ResponseEntity.ok(code);
  }

  @Patch('/:id/code') async refreshCode(
    @Param('id') id: number,
  ): Promise<ResponseEntity<string>> {
    const code = await this.serverService.refreshCode(id);
    return ResponseEntity.ok(code);
  }

  @Post()
  @UseGuards(LoginGuard)
  @UseInterceptors(FileInterceptor('icon'))
  async createServer(
    @Session()
    session: ExpressSession,
    @Body() requestServerDto: RequestServerDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ResponseEntity<number>> {
    try {
      requestServerDto = new RequestServerDto(
        requestServerDto.name,
        requestServerDto.description,
      );
      let imgUrl: string;

      if (icon && icon.mimetype.substring(0, 5) === 'image') {
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('icon'))
  async updateServer(
    @Session()
    session: ExpressSession,
    @Param('id') id: number,
    @Body() requestServerDto: RequestServerDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ResponseEntity<string>> {
    try {
      requestServerDto = new RequestServerDto(
        requestServerDto.name,
        requestServerDto.description,
      );
      let imgUrl: string;

      if (icon && icon.mimetype.substring(0, 5) === 'image') {
        const uploadedFile = await this.imageService.uploadFile(icon);
        imgUrl = uploadedFile.Location;
      }
      const user = session.user;

      await this.serverService.updateServer(id, requestServerDto, user, imgUrl);

      return ResponseEntity.noContent();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteServer(
    @Session()
    session: ExpressSession,
    @Param('id') id: number,
  ): Promise<ResponseEntity<string>> {
    try {
      const user = session.user;
      await this.serverService.deleteServer(id, user);
      return ResponseEntity.noContent();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
