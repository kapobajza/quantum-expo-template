export const zIndex = {
  regular: 1,
  behind: -1,
  average: 5,
  top: 10,
  high: 20,
  higher: 999,
  highest: 9999,
} as const;

export type ThemeZIndex = keyof typeof zIndex;
