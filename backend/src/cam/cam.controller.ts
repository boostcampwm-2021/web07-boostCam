import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CamService } from './cam.service';

@Controller('api/cam')
export class CamController {
  constructor(private camService: CamService) {}

  @Post('/room')
  createRoom(@Body() payload: { roomid: string }): string {
    const { roomid } = payload;
    let statusCode = 201;
    if (!this.camService.createRoom(roomid)) statusCode = 500;
    return Object.assign({
      statusCode,
      data: payload,
    });
  }

  @Get('/room/:id')
  isRoomExist(@Param('id') id: string): string {
    let statusCode = 201;
    if (!this.camService.isRoomExist(id)) statusCode = 500;
    return Object.assign({
      statusCode,
      data: { id },
    });
  }

  @Get('/roomlist')
  getRoomList(): string {
    const roomList = this.camService.getRoomList();
    const roomListJson = JSON.stringify(Array.from(roomList.entries()));
    return Object.assign({
      statusCode: 201,
      data: { roomListJson },
    });
  }
}
