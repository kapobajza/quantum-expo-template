import { useRouter } from 'expo-router';
import React from 'react';

import { Button, Container, Text } from '@/components';
import { Icon } from '@/components/Icon';
import { Header } from '@/components/Navigation';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

const EmailConfirmed = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const styles = useStyles(stylesheet);

  return (
    <>
      <Header title={t('emailConfirmed.title')} />
      <Container fill useSafeAreas style={styles.container}>
        <Icon
          name="CheckMarkSquare"
          width="15"
          height="15"
          color="success.100"
          style={styles.icon}
        />
        <Text variant="h4" center>
          {t('emailConfirmed.message')}
        </Text>
        <Button
          title={t('emailConfirmed.backToLogin')}
          onPress={() => {
            router.replace('/auth/login');
          }}
        />
      </Container>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: theme.spacing['6'],
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: theme.spacing['4'],
  },
}));

export default EmailConfirmed;
