import { Router } from 'expo-router';
import i18next from 'i18next';
import 'react-native-unistyles/mocks';
import { afterEach, vi } from 'vitest';

import '@/theme/unistyles';

const createComponentMock = () => {
  return vi
    .fn()
    .mockImplementation(
      ({ children }: { children: React.ReactNode }) => children,
    );
};

vi.mock('react-native', () => ({
  StyleSheet: {
    create: (obj: Record<string, unknown>) => obj,
  },
  View: createComponentMock(),
  Text: createComponentMock(),
  Pressable: createComponentMock(),
  StatusBar: createComponentMock(),
  Platform: {
    OS: 'ios',
    select: (obj: Record<string, unknown>) => obj,
  },
  NativeModules: vi.mocked({}),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 1,
    height: 1,
  }),
  useColorScheme: vi.fn(),
  Appearance: {
    getColorScheme: vi.fn(),
  },
}));

vi.mock('@react-navigation/native', () => ({
  useBackButton: vi.fn(),
  DefaultTheme: vi.mocked({ colors: {} }),
  ThemeProvider: createComponentMock(),
}));

vi.mock('expo-system-ui', () => ({
  setBackgroundColorAsync: vi.fn(),
}));

vi.mock('expo-linking', () => ({
  parse: vi.fn(),
  createURL: vi.fn().mockImplementation((path: string) => {
    return `barbershop://${path}`;
  }),
}));

vi.mock('expo-web-browser', () => ({
  openAuthSessionAsync: vi.fn(),
  WebBrowserResultType: {
    CANCEL: 'cancel',
    DISMISS: 'dismiss',
  },
}));

const getRouteWithPrefix = (route: string) => {
  if (route.startsWith('/')) {
    return route;
  }
  return `/${route}`;
};

const pathnameMock = vi.hoisted(() => {
  let stack: string[] = [];

  return {
    push: (newPathname: string | undefined) => {
      if (newPathname) {
        stack.push(getRouteWithPrefix(newPathname));
      }
    },
    getPathname: () => stack.pop(),
    replace: (newPathname: string | undefined) => {
      if (newPathname) {
        const stackLength = stack.length === 0 ? 1 : stack.length;
        stack[stackLength - 1] = getRouteWithPrefix(newPathname);
      }
    },
    reset: (route: string | undefined) => {
      stack = route ? [getRouteWithPrefix(route)] : [];
    },
    back: () => {
      if (stack.length > 0) {
        stack.pop();
      }
    },
  };
});

vi.mock('expo-router', () => {
  const router = {
    replace: (href) => {
      if (typeof href === 'string') {
        pathnameMock.replace(href);
        return;
      }

      pathnameMock.replace(href.pathname);
    },
    push: (href) => {
      if (typeof href === 'string') {
        pathnameMock.push(href);
        return;
      }

      pathnameMock.push(href.pathname);
    },
    back: pathnameMock.back,
  } satisfies Pick<Router, 'replace' | 'push' | 'back'>;
  return {
    router,
    useNavigation: vi.fn().mockReturnValue({
      reset: (params: { index: number; routes: { name: string }[] }) => {
        pathnameMock.reset(params.routes[0].name);
      },
    }),
    usePathname: () => pathnameMock.getPathname(),
    useRouter: () => router,
  };
});

vi.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      scheme: 'my-app',
    },
    appOwnership: 'expo',
  },
  AppOwnership: {
    Expo: 'expo',
  },
}));

vi.mock('expo-secure-store', () => ({
  getItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
}));

vi.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: vi.fn(),
  hideAsync: vi.fn(),
}));

vi.mock('expo-crypto', () => ({
  randomUUID: vi.fn(),
}));

vi.mock('@sentry/react-native', () => ({
  Sentry: {
    init: vi.fn(),
  },
}));

vi.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: createComponentMock(),
    Gesture: {
      Pan: vi.fn().mockImplementation(() => ({
        onStart: vi.fn().mockReturnThis(),
        onUpdate: vi.fn().mockReturnThis(),
        onEnd: vi.fn().mockReturnThis(),
      })),
    },
    GestureDetector: createComponentMock(),
  };
});

vi.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: vi.fn().mockReturnValue({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

vi.mock('react-native-reanimated', () => ({
  default: {
    View: createComponentMock(),
    createAnimatedComponent: vi
      .fn()
      .mockImplementation(
        (Component: React.ComponentType<unknown>) => Component,
      ),
  },
  runOnJS: vi.fn(),
  useAnimatedStyle: vi.fn(),
  useSharedValue: vi.fn().mockReturnValue({
    value: 0,
  }),
  withTiming: vi.fn(),
}));

vi.mock('drizzle-orm/expo-sqlite/migrator', () => ({
  migrate: vi.fn(),
}));

vi.mock('expo-crypto', () => ({
  randomUUID: vi.fn().mockReturnValue('mock-uuid'),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({
    t: vi.fn().mockImplementation((key: string) => key),
    ready: true,
    i18n: i18next,
  }),
}));

vi.mock('react-native-svg', () => ({
  default: createComponentMock(),
  Path: createComponentMock(),
  Rect: createComponentMock(),
}));

vi.mock('react-native-screens', () => ({
  FullWindowOverlay: createComponentMock(),
}));

vi.stubGlobal('__DEV__', true);
vi.stubGlobal('expo', {
  NativeModule: {},
});
vi.stubEnv('EXPO_OS', 'ios');

afterEach(() => {
  pathnameMock.reset(undefined);
});
