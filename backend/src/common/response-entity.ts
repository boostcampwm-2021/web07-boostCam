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
}

export default ResponseEntity;
