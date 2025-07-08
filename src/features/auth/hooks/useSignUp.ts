import { useRouter } from 'expo-router';

import { useApi } from '@/api';
import { useToast } from '@/components/Toast';
import { useTranslation } from '@/locale';
import { useMutation } from '@/query';
import { AuthSignUpRequestBody } from '@/types';

export const useSignUp = () => {
  const { authApi } = useApi();
  const { showSuccess } = useToast();
  const { t } = useTranslation();
  const router = useRouter();

  return useMutation({
    mutationFn(data: AuthSignUpRequestBody) {
      return authApi.signUp(data);
    },
    onSuccess() {
      router.back();
      showSuccess(t('signUp.successMessage'));
    },
  });
};
