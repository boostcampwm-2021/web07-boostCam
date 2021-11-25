type FetchResponseObject<T> = {
  statusCode: number;
  data: T;
};

export default FetchResponseObject;
