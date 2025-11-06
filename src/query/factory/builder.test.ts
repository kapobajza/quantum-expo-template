import { describe, expect, test } from 'vitest';

import { constructQueryKeys } from './builder';
import { createQueryOptionsFactory } from './factory';

describe('query factory builder', () => {
  test('should construct correct query keys with object notation', () => {
    const usersOptions = createQueryOptionsFactory('users', {
      me: {
        queryFn() {
          return null;
        },
        queryKey: ['me'],
      },
    });
    const postsOptions = createQueryOptionsFactory('posts', {
      all: {
        queryFn() {
          return null;
        },
        queryKey: ['all'],
      },
    });

    const mergedOptions = {
      users: usersOptions,
      posts: postsOptions,
    };
    const queryKeys = constructQueryKeys(mergedOptions);

    expect(queryKeys.posts.all).toEqual(['posts', 'all']);
    expect(queryKeys.users.me).toEqual(['users', 'me']);
  });

  test('should construct correct query keys with function notation', () => {
    const usersOptions = createQueryOptionsFactory('users', {
      byId: (id: number) => ({
        queryFn() {
          return null;
        },
        queryKey: ['byId', id],
      }),
    });
    const postsOptions = createQueryOptionsFactory('posts', {
      details: (args: { foo: string; bar: string }) => ({
        queryFn() {
          return null;
        },
        queryKey: ['details', args],
      }),
    });

    const mergedOptions = {
      users: usersOptions,
      posts: postsOptions,
    };
    const queryKeys = constructQueryKeys(mergedOptions);

    expect(queryKeys.users.byId(1)).toEqual(['users', 'byId', 1]);
    expect(queryKeys.posts.details({ foo: 'foo', bar: 'bar' })).toEqual([
      'posts',
      'details',
      { foo: 'foo', bar: 'bar' },
    ]);
  });

  test('should construct query keys with mixed notations', () => {
    const usersOptions = createQueryOptionsFactory('users', {
      me: {
        queryFn() {
          return null;
        },
        queryKey: ['me'],
      },
      byId: (id: number) => ({
        queryFn() {
          return null;
        },
        queryKey: ['byId', id],
      }),
    });
    const postsOptions = createQueryOptionsFactory('posts', {
      all: {
        queryFn() {
          return null;
        },
        queryKey: ['all'],
      },
      details: (args: { foo: string; bar: string }) => ({
        queryFn() {
          return null;
        },
        queryKey: ['details', args],
      }),
    });

    const mergedOptions = {
      users: usersOptions,
      posts: postsOptions,
    };
    const queryKeys = constructQueryKeys(mergedOptions);

    expect(queryKeys.users.me).toEqual(['users', 'me']);
    expect(queryKeys.users.byId(1)).toEqual(['users', 'byId', 1]);
    expect(queryKeys.posts.all).toEqual(['posts', 'all']);
    expect(queryKeys.posts.details({ foo: 'foo', bar: 'bar' })).toEqual([
      'posts',
      'details',
      { foo: 'foo', bar: 'bar' },
    ]);
  });
});
