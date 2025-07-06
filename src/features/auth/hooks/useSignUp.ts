import { useApi } from '@/api';
import { useToast } from '@/components/Toast';
import { useTranslation } from '@/locale';
import { useMutation } from '@/query';
import { AuthSignUpRequestBody } from '@/types';

export const useSignUp = () => {
  const { authApi } = useApi();
  const { showSuccess } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn(data: AuthSignUpRequestBody) {
      return authApi.signUp(data);
    },
    onSuccess() {
      showSuccess(t('signUp.successMessage'));
    },
  });
};
