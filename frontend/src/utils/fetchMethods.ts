import FetchResponseObject from '../types/fetch';

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

export default fetchData;
