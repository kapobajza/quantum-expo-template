import { useApi } from '@/api';
import { useNavigation } from '@/hooks';
import { useMutation } from '@/query';
import { useService } from '@/services';
import { AuthSignInRequestBody } from '@/types';

export function useSignIn() {
  const { authApi } = useApi();
  const { storageService } = useService();
  const navigation = useNavigation();

  return useMutation({
    async mutationFn(data: AuthSignInRequestBody) {
      const res = await authApi.signIn(data);

      await storageService.setSecureItem('AuthToken', {
        token: res.data.access_token,
        refreshToken: res.data.refresh_token,
      });
    },
    onSuccess() {
      navigation.reset({
        index: 0,
        routes: [{ name: '(app)' }],
      });
    },
  });
}
