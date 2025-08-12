import { useRouter } from 'expo-router';

import { useApi } from '@/api';
import { RouteName } from '@/constants/route';
import { useMutation } from '@/query';
import { useService } from '@/services';

export const useLogout = () => {
  const { authApi } = useApi();
  const { storageService } = useService();
  const router = useRouter();

  return useMutation({
    mutationFn() {
      return authApi.signOut();
    },
    onSettled() {
      void storageService.deleteSecureItem('AuthToken');
      router.replace(RouteName.Auth.Login);
    },
  });
};
