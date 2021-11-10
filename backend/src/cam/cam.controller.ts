import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';

import { CamService } from './cam.service';

@Controller('cam')
export class CamController {
  constructor(private camService: CamService) {}
  @Get('/test')
  test(): string {
    return 'Test Get API Value';
  }
  @Get('/test2/:id')
  test2(@Param('id') id: string): string {
    return `Test Get API 2 received ${id}`;
  }
  @Get('/test3')
  test3(@Query('id') id: string): string {
    return `Test Get API 3 received ${id}`;
  }
  @Post('/create-room')
  createRoom(@Body() payload: { roomid: string }): string {
    const { roomid } = payload;
    let statusCode = 201;
    if (!this.camService.createRoom(roomid)) statusCode = 500;
    console.log(this.camService.showMap());
    return Object.assign({
      statusCode,
      data: payload,
      statusMsg: 'created successfully',
    });
  }

  @Post('/is-room-exist')
  isRoomExist(@Body() payload: { roomid: string }): string {
    const { roomid } = payload;
    let statusCode = 201;
    if (!this.camService.isRoomExist(roomid)) statusCode = 500;
    console.log(this.camService.showMap());
    return Object.assign({
      statusCode,
      data: payload,
      statusMsg: 'created successfully',
    });
  }
}
