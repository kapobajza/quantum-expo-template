import { Header as RNHeader } from '@react-navigation/elements';

import { Text } from '@/components/Text';
import { useTranslation } from '@/locale';
import { useTheme } from '@/theme';

export interface HeaderProps {
  canGoBack?: boolean;
  title: string;
}

export const Header = ({ title, canGoBack }: HeaderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

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
      headerBackTitleStyle={{
        fontFamily: theme.fontFamily.spaceMono,
        fontSize: theme.fontSize['16'],
      }}
    />
  );
};
