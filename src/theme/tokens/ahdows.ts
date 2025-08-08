import { ViewStyle } from 'react-native';

export const shadows = {
  xSmall: {
    elevation: 1,
    shadowColor: 'rgba(13, 13, 18, 0.06)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  small: {
    elevation: 2,
    shadowColor: 'rgba(13, 13, 18, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  medium: {
    elevation: 4,
    shadowColor: 'rgba(13, 13, 18, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  large: {
    elevation: 6,
    shadowColor: 'rgba(13, 13, 18, 0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  xLarge: {
    elevation: 8,
    shadowColor: 'rgba(13, 13, 18, 0.12)',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 1,
    shadowRadius: 48,
  },
  xXLarge: {
    elevation: 10,
    shadowColor: 'rgba(13, 13, 18, 0.18)',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 1,
    shadowRadius: 48,
  },
} as const satisfies Record<
  string,
  Required<
    Pick<
      ViewStyle,
      | 'shadowColor'
      | 'shadowOffset'
      | 'shadowOpacity'
      | 'shadowRadius'
      | 'elevation'
    >
  >
>;
