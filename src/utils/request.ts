import axios, { AxiosRequestConfig, Method } from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const requestService = async (
  url: string,
  body: unknown,
  headers: any,
  params?: any,
  pureHeaders = false,
  method: Method = 'GET'
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers,
    params,
    pureHeaders,
    baseURL: baseUrl
  };
  const response = await axios(config);
  return response.data;
};