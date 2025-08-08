import { type TextStyle } from 'react-native';

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold'
  | 'medium'
  | 'regular';

export const fontSize = {
  '8': 8,
  '10': 10,
  '12': 12,
  '13': 13,
  '14': 14,
  '16': 16,
  '18': 18,
  '20': 20,
  '22': 22,
  '24': 24,
  '26': 26,
  '28': 28,
  '32': 32,
} as const;

export type FontSize = keyof typeof fontSize;

export const fontWeight = {
  '100': '100',
  '200': '200',
  '300': '300',
  '400': '400',
  '500': '500',
  '600': '600',
  '700': '700',
  '800': '800',
  '900': '900',
  medium: '500',
  bold: '700',
  regular: '400',
} as const satisfies Record<FontWeight, string>;

export const lineHeight = {
  '8': 8,
  '10': 10,
  '12': 12,
  '13': 13,
  '14': 14,
  '16': 16,
  '18': 18,
  '20': 20,
  '22': 22,
  '24': 24,
  '26': 26,
  '28': 28,
  '30': 30,
  '32': 32,
} as const satisfies Record<string, number>;

export const fontFamily = {
  spaceMono: 'SpaceMono-Regular',
} as const;

export type TypographyOptions = Pick<
  TextStyle,
  'fontWeight' | 'fontSize' | 'lineHeight'
>;

const mediumTypography = {
  fontWeight: fontWeight['500'],
  fontSize: fontSize['16'],
  lineHeight: lineHeight['20'],
} as const satisfies TypographyOptions;

const smallTypography = {
  fontWeight: fontWeight['400'],
  fontSize: fontSize['14'],
  lineHeight: lineHeight['18'],
} as const satisfies TypographyOptions;

const xSmallTypography = {
  fontWeight: fontWeight['400'],
  fontSize: fontSize['12'],
  lineHeight: lineHeight['16'],
} as const satisfies TypographyOptions;

const largeTypography = {
  fontWeight: fontWeight['400'],
  fontSize: fontSize['18'],
  lineHeight: lineHeight['24'],
} as const satisfies TypographyOptions;

export const typography = {
  h1: {
    fontWeight: fontWeight[700],
    fontSize: fontSize['32'],
    lineHeight: lineHeight['32'],
  },
  h2: {
    fontWeight: fontWeight[700],
    fontSize: fontSize['28'],
    lineHeight: lineHeight['30'],
  },
  h3: {
    fontWeight: fontWeight['700'],
    fontSize: fontSize['26'],
    lineHeight: lineHeight['26'],
  },
  h4: {
    fontWeight: fontWeight['600'],
    fontSize: fontSize['24'],
    lineHeight: lineHeight['26'],
  },
  h5: {
    fontWeight: fontWeight['700'],
    fontSize: fontSize['20'],
    lineHeight: lineHeight['24'],
  },
  h6: {
    fontWeight: fontWeight['700'],
    fontSize: fontSize['18'],
    lineHeight: lineHeight['22'],
  },
  body: {
    regular: mediumTypography,
    medium: {
      ...mediumTypography,
      fontWeight: fontWeight['500'],
    },
    semibold: {
      ...mediumTypography,
      fontWeight: fontWeight['600'],
    },
  },
  small: {
    regular: smallTypography,
    medium: {
      ...smallTypography,
      fontWeight: fontWeight['500'],
    },
    semibold: {
      ...smallTypography,
      fontWeight: fontWeight['600'],
    },
  },
  xSmall: {
    regular: xSmallTypography,
    medium: {
      ...xSmallTypography,
      fontWeight: fontWeight['500'],
    },
    semibold: {
      ...xSmallTypography,
      fontWeight: fontWeight['600'],
    },
  },
  large: {
    regular: largeTypography,
    medium: {
      ...largeTypography,
      fontWeight: fontWeight['500'],
    },
    semibold: {
      ...largeTypography,
      fontWeight: fontWeight['600'],
    },
  },
  emphasis: {
    fontWeight: fontWeight['700'],
    fontSize: fontSize['14'],
    lineHeight: lineHeight['20'],
  },
} as const satisfies Record<
  string,
  TypographyOptions | Record<string, TypographyOptions>
>;

export type Typography = typeof typography;

type NestedKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, TypographyOptions>
    ? `${K & string}.${keyof T[K] & string}`
    : K;
}[keyof T];

export type TypographyVariant = NestedKeys<typeof typography>;
