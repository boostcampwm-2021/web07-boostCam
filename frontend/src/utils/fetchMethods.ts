const fetchData = async <T, R>(method: string, url: string, requestBody?: T): Promise<R> => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const responseObject = await response.json();
  return responseObject.data;
};

export default fetchData;
