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
import { CamsService } from '../cams/cams.service';
import { RequestCamsDto } from '../cams/cams.dto';

@Controller('/api/servers')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private imageService: ImageService,
    private camsService: CamsService,
  ) {}

  @Get('/:id/users') async findOneWithUsers(
    @Param('id') id: number,
  ): Promise<ResponseEntity<ServerWithUsersDto>> {
    const serverWithUsers = await this.serverService.findOneWithUsers(id);
    return ResponseEntity.ok(serverWithUsers);
  }

  @Get('/:id/cams') async findCams(
    @Param('id') id: number,
  ): Promise<ResponseEntity<RequestCamsDto[]>> {
    const cams = await this.camsService.getCams(id);
    return ResponseEntity.ok(cams);
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
