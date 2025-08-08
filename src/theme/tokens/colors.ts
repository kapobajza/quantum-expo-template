import { Leaves } from '@/types';

const generalColors = {
  primary: {
    50: '#B0BFC2',
    100: '#9CAFB3',
    200: '#889EA3',
    300: '#748E94',
    400: '#617E85',
    500: '#4D6E75',
    600: '#395E66',
    700: '#33555C',
    800: '#2E4B52',
    900: '#284247',
  },
  secondary: {
    50: '#191919',
    100: '#333333',
    200: '#4C4C4C',
    300: '#666666',
    400: '#808080',
    500: '#999999',
    600: '#B3B3B3',
    700: '#CCCCCC',
    800: '#E6E6E6',
    900: '#FFFFFF',
  },
  error: {
    100: '#FF4D4D',
    200: '#FF3333',
    300: '#FF1A1A',
    400: '#FF0000',
    500: '#FF6666',
    600: '#FFE6E6',
    700: '#FFCCCC',
    800: '#FFB3B3',
    900: '#FF9999',
  },
  success: {
    100: '#4DFF4D',
    200: '#33FF33',
    300: '#1AFF1A',
    400: '#00FF00',
    500: '#66FF66',
    600: '#E6FFE6',
    700: '#CCFFCC',
    800: '#B3FFB3',
    900: '#99FF99',
  },
} as const;

type GeneralColors = typeof generalColors;

interface CustomizableColors extends GeneralColors {
  background: {
    main: string;
    text: {
      main: string;
    };
  };
}

export const lightThemeColors: CustomizableColors = {
  ...generalColors,
  background: {
    main: '#FFFFFF',
    text: {
      main: '#284247',
    },
  },
} as const;

export const darkThemeColors: CustomizableColors = {
  ...generalColors,
  background: {
    main: '#1A1A1A',
    text: {
      main: '#E6E6E6',
    },
  },
} as const;

export type ThemeColor = Leaves<typeof lightThemeColors>;
