import { Leaves } from '@/types';

const generalColors = {
  greyscale: {
    1000: '#000000',
    900: '#0D0D12',
    800: '#1A1B25',
    700: '#272835',
    600: '#36394A',
    500: '#666D80',
    400: '#818898',
    300: '#A4ACB9',
    200: '#C1C7D0',
    100: '#DFE1E7',
    50: '#ECEFF3',
    25: '#F6F8FA',
    0: '#FFFFFF',
  },
  primary: {
    0: '#FFF8E6',
    25: '#FFE9B0',
    50: '#FFDF8A',
    100: '#FFD054',
    200: '#FFC733',
    300: '#FFB900',
  },
  error: {
    300: '#710E21',
    200: '#96132C',
    100: '#DF1C41',
    50: '#ED8296',
    25: '#FADBE1',
    0: '#FFF0F3',
  },
  success: {
    300: '#184E44',
    200: '#28806F',
    100: '#40C4AA',
    50: '#9EE1D4',
    25: '#DDF3EF',
    0: '#EFFEFA',
  },
  warning: {
    300: '#5C3D1F',
    200: '#966422',
    100: '#FFBE4C',
    50: '#FCDA83',
    25: '#FAEDCC',
    0: '#FFF6E0',
  },
  sky: {
    300: '#0C4E6E',
    200: '#116B97',
    100: '#33CFFF',
    25: '#D1F0FA',
    0: '#F0FBFF',
  },
} as const;

interface ThemeExtensibleColors {
  background: {
    main: string;
    text: {
      main: string;
      dimmed: string;
      out: string;
    };
  };
  surface: {
    background: string;
    border: string;
    text: {
      main: string;
    };
  };
}

const lightExtensibleColors: ThemeExtensibleColors = {
  background: {
    main: generalColors.greyscale[0],
    text: {
      main: generalColors.greyscale[900],
      dimmed: generalColors.greyscale[500],
      out: generalColors.greyscale[300],
    },
  },
  surface: {
    background: generalColors.greyscale[50],
    border: generalColors.greyscale[100],
    text: {
      main: generalColors.greyscale[900],
    },
  },
};

export const lightThemeColors = {
  ...generalColors,
  ...lightExtensibleColors,
} as const;

const darkExtensibleColors: ThemeExtensibleColors = {
  background: {
    main: generalColors.greyscale[900],
    text: {
      main: generalColors.greyscale[0],
      dimmed: generalColors.greyscale[300],
      out: generalColors.greyscale[500],
    },
  },
  surface: {
    background: generalColors.greyscale[800],
    border: generalColors.greyscale[700],
    text: {
      main: generalColors.greyscale[0],
    },
  },
};

export const darkThemeColors = {
  ...generalColors,
  ...darkExtensibleColors,
} as const;

export type ThemeColor = Leaves<typeof lightThemeColors>;
