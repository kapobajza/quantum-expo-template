import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import useInfiniteQuery from './useInfiniteQuery';

const renderHookWithQueryClient = <Result, Props>(
  fn: (initialProps: Props) => Result,
) => {
  return renderHook(fn, {
    wrapper(props) {
      return (
        <QueryClientProvider client={new QueryClient()}>
          {props.children}
        </QueryClientProvider>
      );
    },
  });
};

describe('useInfiniteQuery', () => {
  test('should return transformed results', async () => {
    const { result, rerender } = renderHookWithQueryClient(() =>
      useInfiniteQuery({
        queryFn: () => {
          return Promise.resolve({
            results: [1, 2, 3],
          });
        },
        queryKey: ['key'],
      }),
    );

    expect(result.current.isEmpty).toBe(true);

    await waitFor(() => !result.current.isLoading);
    rerender();

    expect(result.current.results).toEqual([1, 2, 3]);
    expect(result.current.isEmpty).toBe(false);
  });

  test('should return transformed results when fetching a new page', async () => {
    const { result, rerender } = renderHookWithQueryClient(() =>
      useInfiniteQuery({
        queryFn: ({ pageParam }) => {
          let res = [1, 2, 3];

          if (pageParam === 2) {
            res = [4, 5, 6];
          }

          return Promise.resolve({
            results: res,
          });
        },
        queryKey: ['key'],
        limit: 3,
      }),
    );

    await waitFor(() => !result.current.isLoading);
    rerender();

    expect(result.current.results).toEqual([1, 2, 3]);
    expect(result.current.hasNextPage).toBe(true);

    await result.current.fetchNextPage();
    await waitFor(() => !result.current.isFetchingNextPage);

    expect(result.current.results).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should return extraData if present', async () => {
    const { result, rerender } = renderHookWithQueryClient(() =>
      useInfiniteQuery({
        queryFn: () => {
          return Promise.resolve({
            results: [1, 2, 3],
            extraData: {
              extra: 'extra',
            },
          });
        },
        queryKey: ['key'],
      }),
    );

    await waitFor(() => !result.current.isLoading);
    rerender();

    expect(result.current.results).toEqual([1, 2, 3]);
    expect(result.current.extraData).toEqual({
      extra: 'extra',
    });
  });

  test('should fetch on end reached if distanceFromEnd is greater than 0', async () => {
    const { result, rerender } = renderHookWithQueryClient(() =>
      useInfiniteQuery({
        queryFn: ({ pageParam }) => {
          let res = [1, 2, 3];

          if (pageParam === 2) {
            res = [4, 5, 6];
          } else if (pageParam === 3) {
            res = [7, 8, 9];
          }

          return Promise.resolve({
            results: res,
          });
        },
        queryKey: ['key'],
        limit: 3,
      }),
    );

    expect(result.current.isEmpty).toBe(true);

    await waitFor(() => !result.current.isLoading);
    rerender();

    result.current.onEndReached({ distanceFromEnd: 10 });
    result.current.onEndReached({ distanceFromEnd: 10 });
    result.current.onEndReached({ distanceFromEnd: 10 });

    expect(result.current.results).toEqual([1, 2, 3]);
    await waitFor(() => {
      expect(result.current.results).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
