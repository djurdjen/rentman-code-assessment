export const apiFetch = {
  get: async <TResponse extends Record<string, any>, TPayload = undefined>(
    url: string, 
    body?: ReadableStream<TPayload>, 
  ): Promise<TResponse> => {
    try {
      const httpRequest = await fetch(url, {
        method: 'GET', 
        body,
      });
      const response = await httpRequest.json() as TResponse;
      if(response.errorMessage) {
        return Promise.reject(response.errorMessage);
      }
      return response;
    } catch(err) {
      return Promise.reject(err);
    }
  }
};