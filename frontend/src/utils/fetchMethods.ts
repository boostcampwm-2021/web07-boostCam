import { FetchResponseObject, DeleteResponseObject } from '../types/fetch';

const fetchData = async <T, R>(method: string, url: string, requestBody?: T): Promise<FetchResponseObject<R>> => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const responseObject = await response.json();
  const { statusCode, message, data } = responseObject;
  return { statusCode, message, data };
};

const deleteApi = async (url: string): Promise<DeleteResponseObject> => {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const headerStatusCode = response.status;
  if (headerStatusCode === 204) {
    return { statusCode: headerStatusCode, message: null };
  }
  const responseObject = await response.json();
  const { statusCode, message } = responseObject;
  return { statusCode, message };
};

export { fetchData, deleteApi };
