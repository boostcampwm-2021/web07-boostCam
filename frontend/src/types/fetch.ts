type FetchResponseObject<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

export default FetchResponseObject;
