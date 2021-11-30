type FetchResponseObject<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

type DeleteResponseObject = {
  statusCode: number;
  message: string | null;
};

export type { FetchResponseObject, DeleteResponseObject };
