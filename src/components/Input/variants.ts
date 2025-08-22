import { TextStyle, ViewStyle } from 'react-native';

import { AppTheme } from '@/theme/types';

interface TextInputVariantOptions {
  container: Pick<
    ViewStyle,
    'borderColor' | 'backgroundColor' | 'borderRadius'
  >;
  focus: Pick<ViewStyle, 'backgroundColor' | 'borderColor' | 'borderWidth'>;
  input: Pick<TextStyle, 'color'>;
}

export interface TextInputVariants {
  primary: TextInputVariantOptions;
  chat: TextInputVariantOptions;
}

export const buildTextInputVariants = (theme: AppTheme): TextInputVariants => {
  return {
    primary: {
      container: {
        borderColor: theme.colors.surface.border,
        backgroundColor: theme.colors.surface.background,
      },
      focus: {
        backgroundColor: theme.addColorTransparency(
          theme.colors.primary[300],
          0.1,
        ),
        borderColor: theme.colors.primary[300],
      },
      input: {
        color: theme.colors.background.text.main,
      },
    },
    chat: {
      container: {
        borderColor: 'transparent',
        backgroundColor: theme.colors.surface.background,
        borderRadius: theme.radii[8],
      },
      focus: {
        backgroundColor: theme.addColorTransparency(
          theme.colors.primary[300],
          0.1,
        ),
        borderColor: theme.colors.primary[300],
        borderWidth: 1,
      },
      input: {
        color: theme.colors.background.text.main,
      },
    },
  };
};
