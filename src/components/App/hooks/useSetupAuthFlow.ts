import { useQueryClient } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';

import { useToast } from '@/components/Toast';
import { AppError, ErrorCode, HttpError, isErrorCode } from '@/error';
import { useMapError } from '@/error/hooks';
import { useMutation, useQueryOptionsFactory } from '@/query';
import { useService } from '@/services';

const useSetupAuthFlow = () => {
  const { storageService } = useService();
  const queryClient = useQueryClient();
  const queryOptions = useQueryOptionsFactory();
  const { showError } = useToast();
  const mapError = useMapError();

  return useMutation({
    async mutationFn() {
      try {
        const token = await storageService.getSecureItem('AuthToken');

        if (!token) {
          throw new AppError(ErrorCode.MissingAuthToken);
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
          ErrorCode.MissingAuthToken,
        );

        if (isUnauthorized || !meData) {
          throw new HttpError(401, ErrorCode.Unauthorized);
        }

        showError(mapError(err));
      } finally {
        await SplashScreen.hideAsync();
      }
    },
    showToastError: false,
  });
};

export default useSetupAuthFlow;
