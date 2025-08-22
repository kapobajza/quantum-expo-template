import { TextStyle, ViewStyle } from 'react-native';

import { TypographyOptions } from '@/theme/tokens/typography';
import { AppTheme } from '@/theme/types';

interface ButtonVariantOptions {
  button: {
    main: Pick<ViewStyle, 'backgroundColor' | 'borderColor' | 'borderWidth'>;
    disabled?: Pick<ViewStyle, 'backgroundColor' | 'borderColor' | 'opacity'>;
  };
  text: {
    main: Pick<TextStyle, 'color'>;
    disabled?: Pick<TextStyle, 'color' | 'opacity'>;
  };
}

export interface ButtonVariants {
  primary: ButtonVariantOptions;
  secondary: ButtonVariantOptions;
  danger: ButtonVariantOptions;
  'danger-outline': ButtonVariantOptions;
}

export const buildButtonVariants = (theme: AppTheme): ButtonVariants => {
  return {
    primary: {
      button: {
        main: {
          backgroundColor: theme.colors.primary[300],
        },
        disabled: {
          backgroundColor: theme.colors.primary[25],
        },
      },
      text: {
        main: {
          color: theme.colors.greyscale[0],
        },
        disabled: {
          color: theme.colors.greyscale[600],
          opacity: 0.3,
        },
      },
    },
    secondary: {
      button: {
        main: {
          backgroundColor: theme.colors.background.main,
          borderWidth: 1,
          borderColor: theme.colors.primary[300],
        },
        disabled: {
          borderColor: theme.colors.greyscale[100],
          opacity: 0.4,
        },
      },
      text: {
        main: {
          color: theme.colors.primary[300],
        },
        disabled: {
          color: theme.colors.greyscale[100],
        },
      },
    },
    danger: {
      button: {
        main: {
          backgroundColor: theme.colors.error[100],
        },
        disabled: {
          backgroundColor: theme.colors.error[25],
        },
      },
      text: {
        main: {
          color: theme.colors.greyscale[0],
        },
      },
    },
    'danger-outline': {
      button: {
        main: {
          backgroundColor: theme.colors.background.main,
          borderColor: theme.colors.error[100],
          borderWidth: 1,
        },
        disabled: {
          borderColor: theme.colors.error[25],
        },
      },
      text: {
        main: {
          color: theme.colors.error[100],
        },
        disabled: {
          color: theme.colors.error[25],
        },
      },
    },
  };
};

export type ButtonVariant = keyof ReturnType<typeof buildButtonVariants>;

export const buildButtonSizes = (theme: AppTheme) => {
  return {
    xSmall: {
      button: {
        height: theme.spacing(6),
      },
      text: theme.typography.xSmall.semibold,
    },
    small: {
      button: {
        height: theme.spacing(8),
      },
      text: theme.typography.small.semibold,
    },
    medium: {
      button: {
        height: theme.spacing(10),
      },
      text: theme.typography.body.semibold,
    },
    large: {
      button: {
        height: theme.spacing(12),
      },
      text: theme.typography.body.medium,
    },
  } as const satisfies Record<
    string,
    { button: { height: ViewStyle['height'] }; text: TypographyOptions }
  >;
};

export type ButtonSize = keyof ReturnType<typeof buildButtonSizes>;
