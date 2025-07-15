import {
  DefaultError,
  QueryClient,
  UseMutationResult,
  useMutation as useTSQMutation,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useToast } from '@/components/Toast/context';
import { useMapError } from '@/error/hooks';
import { useService } from '@/services';

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
  const { loggingService } = useService();

  return useTSQMutation(
    {
      ...otherOptions,
      onError: (error, variables, context) => {
        // We're logging the axios error inside of the request.ts wrapper
        if (!isAxiosError(error)) {
          loggingService.captureException(error);
        }

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
