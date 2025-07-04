export const radii = {
  '1': 2,
  '2': 4,
  '3': 6,
  '4': 8,
  '5': 10,
  '6': 12,
  '7': 14,
  '8': 16,
  '9': 18,
  '10': 20,
  full: 9999,
} as const;

export type ThemeRadius = keyof typeof radii;
