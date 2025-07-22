import { useQueryClient } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';

import { AppError, ErrorCode, isErrorCode } from '@/error';
import { useMutation, useQueryOptionsFactory } from '@/query';
import { useService } from '@/services';

const useSetupAuthFlow = () => {
  const { storageService } = useService();
  const queryClient = useQueryClient();
  const queryOptions = useQueryOptionsFactory();

  return useMutation({
    async mutationFn() {
      try {
        const token = await storageService.getSecureItem('AuthToken');

        if (!token) {
          return 'no_token';
        }

        await queryClient.fetchQuery({
          ...queryOptions.users.me,
          staleTime: 0,
          gcTime: 0,
          retry: false,
          meta: {
            hideToastError: true,
          },
        });
      } catch (err) {
        const meData = queryClient.getQueryData(queryOptions.users.me.queryKey);
        const isUnauthorized = isErrorCode(
          err,
          ErrorCode.Unauthorized,
          ErrorCode.Forbidden,
        );

        if (isUnauthorized || !meData) {
          throw new AppError({
            code: ErrorCode.Unauthorized,
            originalError: err,
          });
        }

        throw err;
      } finally {
        await SplashScreen.hideAsync();
      }
    },
    showToastError: false,
  });
};

export default useSetupAuthFlow;
