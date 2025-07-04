import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { describe, expect, test } from 'vitest';

import { buildRequest } from './request';

const baseURL = 'http://localhost:3000/api';

const mockAxiosInstance = axios.create({
  baseURL,
});

describe('request factory', () => {
  test('should build request correctly', () => {
    const req = buildRequest({
      instance: mockAxiosInstance,
      method: 'get',
      urlPrefix: 'users',
    });

    expect(req.route).toBe('users/');
    expect(req.url).toBe(`${baseURL}/users/`);
  });

  test('should build request with path and query params', async () => {
    const instance = (async (config: AxiosRequestConfig) => {
      return Promise.resolve({
        status: 200,
        data: { message: 'Success' },
        config,
      });
    }) as unknown as AxiosInstance;
    instance.defaults = mockAxiosInstance.defaults;
    instance.interceptors = mockAxiosInstance.interceptors;

    const req = buildRequest({
      instance,
      method: 'get',
      urlPrefix: 'users',
      params: {
        path: '123',
        queryParams: { sortBy: 'name', sortOrder: 'asc' },
      },
    });

    const res = await req.request();

    expect(res.status).toBe(200);
    expect(res.config.url).toBe('users/123?sortBy=name&sortOrder=asc');
  });
});
