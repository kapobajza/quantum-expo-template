import {
  DefaultError,
  QueryClient,
  UseMutationResult,
  useMutation as useTSQMutation,
} from '@tanstack/react-query';

import { useToast } from '@/components/Toast/context';
import { useMapError } from '@/error/hooks';

import { UseMutationOptions } from './types';

export default function useMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { showToastError = true, onError, ...otherOptions } = options;
  const { showError } = useToast();
  const mapError = useMapError();

  return useTSQMutation(
    {
      ...otherOptions,
      onError: (error, variables, context) => {
        if (onError) {
          onError(error, variables, context, showError, mapError);
          return;
        }

        if (showToastError) {
          showError(mapError(error));
        }
      },
    },
    queryClient,
  );
}
