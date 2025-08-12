import { ExpoRouter } from 'expo-router';

type ExpoRouteName = Exclude<
  ExpoRouter.__routes['hrefInputParams']['pathname'],
  '..'
>;

export const RouteName = {
  App: {
    Initial: '/(app)/(tabs)',
  },
  Auth: {
    Login: '/auth/login',
    SignUp: '/auth/sign-up',
    EmailConfirmed: '/auth/email-confirmed',
  },
} as const satisfies Record<
  string,
  ExpoRouteName | Record<string, ExpoRouteName>
>;
