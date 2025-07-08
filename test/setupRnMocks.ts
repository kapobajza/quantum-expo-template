/* eslint-disable @eslint-react/hooks-extra/no-unnecessary-use-prefix */
import { Router } from 'expo-router';
import i18next from 'i18next';
import { afterEach, vi } from 'vitest';

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
  Platform: {
    OS: 'ios',
    select: (obj: Record<string, unknown>) => obj,
  },
  NativeModules: vi.mocked({}),
  useWindowDimensions: vi.fn().mockReturnValue({
    width: 375,
    height: 667,
    fontScale: 1,
    scale: 2,
  }),
}));

vi.mock('expo-linking', () => ({
  parse: vi.fn(),
}));

vi.mock('expo-web-browser', () => ({
  openAuthSessionAsync: vi.fn(),
  WebBrowserResultType: {
    CANCEL: 'cancel',
    DISMISS: 'dismiss',
  },
}));

const pathnameMock = vi.hoisted(() => {
  let paths: string[] = [];

  const setPath = (path: string | undefined) => {
    if (!path) {
      return;
    }

    paths.push(!path.startsWith('/') ? `/${path}` : path);
  };

  return {
    setPath,
    getPath: () => paths.at(-1),
    resetPaths: (initial: string[] = []) => {
      if (initial.length === 0) {
        paths = [];
        return;
      }

      initial.forEach((path) => {
        setPath(path);
      });
    },
    popPaths: () => paths.pop(),
  };
});

vi.mock('expo-router', () => {
  return {
    useRouter: () => {
      return {
        replace: (href) => {
          if (typeof href === 'string') {
            pathnameMock.setPath(href);
            return;
          }

          pathnameMock.setPath(href.pathname);
        },
        back() {
          pathnameMock.popPaths();
        },
      } satisfies Pick<Router, 'replace' | 'back'>;
    },
    useNavigation: vi.fn().mockReturnValue({
      reset: (params: { index: number; routes: { name: string }[] }) => {
        pathnameMock.resetPaths(params.routes.map((r) => r.name));
      },
    }),
    usePathname: () => pathnameMock.getPath(),
  };
});

vi.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      scheme: 'my-app',
    },
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

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({
    t: vi.fn().mockImplementation((key: string) => key),
    ready: true,
    i18n: i18next,
  }),
}));

vi.stubGlobal('__DEV__', true);
vi.stubGlobal('expo', {
  NativeModule: {},
});
vi.stubEnv('EXPO_OS', 'ios');

afterEach(() => {
  pathnameMock.resetPaths();
});
