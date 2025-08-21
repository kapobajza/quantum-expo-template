import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Container, ControlInput } from '@/components';
import { ChangeLanguageButton } from '@/components/ChangeLanguage';
import { Header } from '@/components/Navigation';
import { useSignUp } from '@/features/auth/hooks/useSignUp';
import { useForm } from '@/hooks';
import { useTranslation } from '@/locale';
import { authSignUpSchema } from '@/types';

function SignUp() {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    schema: authSignUpSchema,
  });
  const { mutate: signUp, isPending } = useSignUp();
  const handleSignUp = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <>
      <Header title={t('signUp.title')} canGoBack />
      <ChangeLanguageButton topOffset={50} />
      <Container style={styles.container} fill useSafeAreas>
        <ControlInput
          control={control}
          name="email"
          label={t('validation.fields.email')}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <ControlInput
          control={control}
          name="password"
          secureTextEntry
          label={t('validation.fields.password')}
        />
        <ControlInput
          control={control}
          name="repeatPassword"
          secureTextEntry
          label={t('validation.fields.repeatPassword')}
        />
        <Button
          style={styles.button}
          title={t('general.submit')}
          onPress={handleSignUp}
          disabled={isPending}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: 'center',
    gap: theme.spacing('4'),
  },
  button: {
    marginTop: theme.spacing('4'),
  },
}));

export default SignUp;
