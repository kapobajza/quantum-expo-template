import { useAlert } from '@/components/Alert/hooks';
import { BottomSheetView } from '@/components/BottomSheet/BottomSheetView';
import { useBottomSheet } from '@/components/BottomSheet/context';
import { Container } from '@/components/Container';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';
import { useChangeLanguage, UserLocale, useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

export const ChangeLanguageBottomSheet = () => {
  const { t, i18n } = useTranslation();
  const { changeLanguage, isLoading } = useChangeLanguage();
  const styles = useStyles(stylesheet);
  const { showAlert } = useAlert();
  const { hideBottomSheet } = useBottomSheet();

  return (
    <BottomSheetView>
      <Container style={styles.container}>
        <Text variant="h5" style={styles.title} center>
          {t('changeLanguage.title')}
        </Text>
        {Object.entries(UserLocale).map(([key, value]) => {
          const isSelected = i18n.language === value.code;
          const languageName = t('changeLanguage.languageName', {
            code: value.code,
          });

          return (
            <Pressable
              key={key}
              style={styles.button(isSelected)}
              scaleOutputRange={[0.98, 1]}
              onPress={() => {
                if (isSelected) {
                  return;
                }

                showAlert({
                  title: t('general.areYouSure'),
                  message: t('changeLanguage.alertMessage', {
                    language: languageName,
                  }),
                  onConfirm: (closeModal) => {
                    changeLanguage(value);
                    closeModal();
                    hideBottomSheet();
                  },
                  type: 'prompt',
                });
              }}
              disabled={isLoading}
            >
              <Text style={styles.buttonText(isSelected)}>
                {languageName} ({value.tag})
              </Text>
            </Pressable>
          );
        })}
      </Container>
    </BottomSheetView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  button: (isSelected: boolean) => {
    return {
      padding: theme.spacing['4'],
      borderRadius: theme.radii['4'],
      borderWidth: 1,
      borderColor: theme.colors.primary[100],
      ...(isSelected && {
        backgroundColor: theme.colors.primary[300],
      }),
    };
  },
  container: {
    gap: theme.spacing['2'],
  },
  title: {
    marginBottom: theme.spacing['4'],
  },
  buttonText: (isSelected: boolean) => ({
    color: isSelected ? theme.colors.greyscale[0] : theme.colors.primary[100],
  }),
}));
