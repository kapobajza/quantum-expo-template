import { TextStyle, ViewStyle } from 'react-native';

import { AppTheme } from '@/theme';

interface TextInputVariantOptions {
  container: ViewStyle;
  focus: ViewStyle;
  input: TextStyle;
}

export interface TextInputVariants {
  primary: TextInputVariantOptions;
  chat: TextInputVariantOptions;
}

export const buildTextInputVariants = (theme: AppTheme): TextInputVariants => {
  return {
    primary: {
      container: {
        borderColor: theme.colors.greyscale[700],
        backgroundColor: theme.colors.greyscale[800],
      },
      focus: {
        backgroundColor: theme.addColorTransparency(
          theme.colors.primary[300],
          0.1,
        ),
        borderColor: theme.colors.primary[300],
      },
      input: {
        color: theme.colors.greyscale[0],
      },
    },
    chat: {
      container: {
        borderColor: theme.colors.greyscale[700],
        backgroundColor: theme.colors.greyscale[800],
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
        color: theme.colors.greyscale[0],
      },
    },
  };
};
