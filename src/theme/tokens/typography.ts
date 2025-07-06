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

export type FontSize =
  | '8'
  | '10'
  | '12'
  | '13'
  | '14'
  | '16'
  | '18'
  | '20'
  | '22'
  | '24'
  | '26'
  | '28';

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
} as const satisfies Record<FontSize, number>;

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
