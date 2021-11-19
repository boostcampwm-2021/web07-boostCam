class ResponseEntity<T> {
  statusCode: number;
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
}

export default ResponseEntity;
