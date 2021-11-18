class ResponseEntity<T> {
  statusCode: number;
  message: string;
  data: T;
  constructor(statusCode: number, data: T) {
    this.statusCode = statusCode;
    this.data = data;
  }

  static ok<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity(200, data);
  }
}

export default ResponseEntity;
