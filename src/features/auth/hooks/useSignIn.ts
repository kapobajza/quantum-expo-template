import { router } from 'expo-router';

import { useApi } from '@/api';
import { RouteName } from '@/constants/route';
import { useMutation } from '@/query';
import { useService } from '@/services';
import { AuthSignInRequestBody } from '@/types';

export function useSignIn() {
  const { authApi } = useApi();
  const { storageService, databaseService } = useService();

  return useMutation({
    async mutationFn(data: AuthSignInRequestBody) {
      const res = await authApi.signIn(data);

      await storageService.setSecureItem('AuthToken', {
        token: res.data.access_token,
        refreshToken: res.data.refresh_token,
      });
      await databaseService.setAccessToken(res.data.access_token);
    },
    onSuccess() {
      router.replace(RouteName.App.Initial);
    },
  });
}
