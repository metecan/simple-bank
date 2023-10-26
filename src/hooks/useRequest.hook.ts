type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const useRequest = (url: string, method: MethodType) => {
  const request = async (body?: any) => {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  };

  return request;
};
