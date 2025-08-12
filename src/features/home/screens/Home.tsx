import { useRouter } from 'expo-router';
import React from 'react';

import { useApi } from '@/api';
import { Button, Container } from '@/components';
import { ChangeLanguageButton } from '@/components/ChangeLanguage';
import { RouteName } from '@/constants/route';
import { useTranslation } from '@/locale';
import { useMutation } from '@/query';
import { useService } from '@/services';

const Home = () => {
  const { t } = useTranslation();
  const { authApi } = useApi();
  const { storageService } = useService();
  const router = useRouter();

  const { mutate: logOut, isPending } = useMutation({
    mutationFn() {
      return authApi.signOut();
    },
    onSettled() {
      void storageService.deleteSecureItem('AuthToken');
      router.replace(RouteName.Auth.Login);
    },
  });

  return (
    <>
      <ChangeLanguageButton />
      <Container center="vertical" fill useSafeAreas>
        <Button
          title={t('home.logOut')}
          onPress={() => {
            logOut();
          }}
          isLoading={isPending}
        />
      </Container>
    </>
  );
};

export default Home;
