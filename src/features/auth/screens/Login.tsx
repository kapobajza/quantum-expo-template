import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Container, ControlInput } from '@/components';
import { ChangeLanguageButton } from '@/components/ChangeLanguage';
import ParsedText from '@/components/Text/ParsedText';
import { buildHtmlTagPattern } from '@/components/Text/util';
import { RouteName } from '@/constants/route';
import { useSignIn } from '@/features/auth/hooks/useSignIn';
import { useForm } from '@/hooks';
import { useTranslation } from '@/locale';
import { authSignInSchema } from '@/types';

const Login = () => {
  const { t } = useTranslation();
  const { mutate: signIn, isPending } = useSignIn();
  const { control, handleSubmit } = useForm({
    schema: authSignInSchema,
  });

  const handleSignIn = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <>
      <ChangeLanguageButton />
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
        <Button
          style={styles.button}
          title={t('general.submit')}
          disabled={isPending}
          onPress={handleSignIn}
        />
        <ParsedText
          variant="body.semibold"
          center
          parse={[
            {
              pattern: buildHtmlTagPattern('a'),
              href: RouteName.Auth.SignUp,
              removeMatchingTags: true,
            },
          ]}
        >
          {t('login.dontHaveAccount')}
        </ParsedText>
      </Container>
    </>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: 'center',
    gap: theme.spacing('4'),
  },
  button: {
    marginTop: theme.spacing('4'),
  },
}));

export default Login;
