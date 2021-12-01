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
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';
import {
  serverWithUserDtoSchema,
  serverCodeSchema,
  emptyResponseSchema,
} from './server.schema';

@UseGuards(LoginGuard)
@Controller('/api/servers')
@ApiExtraModels(ResponseEntity)
@ApiExtraModels(ServerWithUsersDto)
@ApiExtraModels(UserDto)
export class ServerController {
  constructor(
    private serverService: ServerService,
    private imageService: ImageService,
    private camService: CamService,
  ) {}

  @ApiOkResponse(serverWithUserDtoSchema)
  @Get('/:id/users')
  async findOneWithUsers(
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

  @ApiOkResponse(serverCodeSchema)
  @Get('/:id/code')
  async findCode(@Param('id') id: number): Promise<ResponseEntity<string>> {
    const code = await this.serverService.findCode(id);
    return ResponseEntity.ok(code);
  }

  @ApiOkResponse(serverCodeSchema)
  @Patch('/:id/code')
  async refreshCode(
    @Session()
    session: ExpressSession,
    @Param('id') id: number,
  ): Promise<ResponseEntity<string>> {
    const user = session.user;
    const code = await this.serverService.refreshCode(id, user);
    return ResponseEntity.ok(code);
  }

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async createServer(
    @Session()
    session: ExpressSession,
    @Body() requestServerDto: RequestServerDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ResponseEntity<number>> {
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
    const newServerId = await this.serverService.create(
      user,
      requestServerDto,
      imgUrl,
    );

    return ResponseEntity.created(newServerId);
  }

  @ApiOkResponse(serverCodeSchema)
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
  }

  @ApiOkResponse(emptyResponseSchema)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteServer(
    @Session()
    session: ExpressSession,
    @Param('id') id: number,
  ): Promise<ResponseEntity<string>> {
    const user = session.user;
    await this.serverService.deleteServer(id, user);

    return ResponseEntity.noContent();
  }
}
