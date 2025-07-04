import { TextStyle, ViewStyle } from 'react-native';

import { AppTheme } from '@/theme';

export const buildButtonVariants = (theme: AppTheme) => {
  return {
    primary: {
      button: {
        backgroundColor: theme.colors.primary[500],
      },
      text: {
        color: theme.colors.secondary[900],
      },
    },
    secondary: {
      button: {
        backgroundColor: theme.colors.secondary[900],
        borderWidth: 1,
        borderColor: theme.colors.primary[500],
      },
      text: {
        color: theme.colors.primary[500],
      },
    },
  } satisfies Record<
    string,
    {
      button: ViewStyle;
      text: TextStyle;
    }
  >;
};

export type ButtonVariant = keyof ReturnType<typeof buildButtonVariants>;
