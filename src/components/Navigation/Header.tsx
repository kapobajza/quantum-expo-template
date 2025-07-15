import { Header as RNHeader } from '@react-navigation/elements';

import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

export interface HeaderProps {
  canGoBack?: boolean;
  title: string;
}

export const Header = ({ title, canGoBack }: HeaderProps) => {
  const { t } = useTranslation();
  const styles = useStyles(stylesheet);

  return (
    <RNHeader
      title={title}
      headerTitle={({ children }) => <Text variant="h5">{children}</Text>}
      back={
        canGoBack
          ? {
              title: t('general.back'),
              href: undefined,
            }
          : undefined
      }
      headerLeft={({ label, onPress }) => {
        return (
          <Pressable
            style={styles.headerLeft}
            onPress={() => {
              onPress?.();
            }}
          >
            <Icon name="ChevronLeftIcon" />
            <Text variant="h6">{label}</Text>
          </Pressable>
        );
      }}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing['1'],
    marginLeft: theme.spacing['2'],
  },
}));
