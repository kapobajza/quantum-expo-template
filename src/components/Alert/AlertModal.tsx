import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { ModalComponentProps } from '@/components/Modal';
import { Text } from '@/components/Text';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

export const AlertModal = ({
  params,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  closeModal,
}: ModalComponentProps<'Alert'>) => {
  const { title, message, type = 'info', onConfirm, onCancel } = params;
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text variant="h5" center>
        {title}
      </Text>
      <Text style={styles.message} center>
        {message}
      </Text>
      <Button
        title={type === 'info' ? t('general.ok') : t('general.confirm')}
        onPress={() => {
          if (onConfirm) {
            onConfirm(closeModal);
            return;
          }

          closeModal();
        }}
        style={styles.button}
      />
      {type === 'prompt' && (
        <Button
          title={t('general.cancel')}
          variant="secondary"
          onPress={() => {
            if (onCancel) {
              onCancel(closeModal);
              return;
            }

            closeModal();
          }}
          style={styles.button}
        />
      )}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  button: {
    padding: theme.spacing['2'],
  },
  message: {
    marginBottom: theme.spacing['4'],
  },
  container: {
    gap: theme.spacing['2'],
  },
}));
