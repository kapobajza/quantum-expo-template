import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { useApi } from '@/api';
import { RouteName } from '@/constants/route';
import { useMutation } from '@/query';
import { useService } from '@/services';

export const useLogout = () => {
  const { authApi } = useApi();
  const { storageService } = useService();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return authApi.signOut();
    },
    onSettled() {
      void storageService.deleteSecureItem('AuthToken');
      queryClient.clear();
      router.replace(RouteName.Auth.Login);
    },
  });
};
