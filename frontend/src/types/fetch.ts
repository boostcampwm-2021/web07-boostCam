type FetchResponseObject<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

type NoContentsResponse = {
  statusCode: number;
  message: string | null;
};

type CreatedResponse = {
  statusCode: number;
  message: string | null;
  data: number | null;
};

export type { FetchResponseObject, NoContentsResponse, CreatedResponse };
