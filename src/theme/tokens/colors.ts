import { Leaves } from '@/types';

export const colors = {
  primary: {
    50: '#003D80',
    100: '#004999',
    200: '#0055B3',
    300: '#0062CC',
    400: '#006EE6',
    500: '#007AFF',
    600: '#66AFFF',
    700: '#80BDFF',
    800: '#99CAFF',
    900: '#B3D7FF',
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
  background: {
    main: '#FFFFFF',
  },
} as const;

export type ThemeColors = Leaves<typeof colors>;
