import { ApiProperty } from '@nestjs/swagger';

class ResponseEntity<T> {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  data: T;
  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static ok<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity(200, null, data);
  }

  static created(id: number): ResponseEntity<number> {
    return new ResponseEntity(201, null, id);
  }
  static noContent(): ResponseEntity<null> {
    return new ResponseEntity(204, null, null);
  }
}

export default ResponseEntity;
