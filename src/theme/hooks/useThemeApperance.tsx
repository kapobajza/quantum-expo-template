import { useCallback, useReducer } from 'react';
import { useColorScheme } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { useDatabaseRepo } from '@/db/context';
import { ThemeAppearance, UpdateThemeParam } from '@/theme/types';

interface State {
  themeAppearance: ThemeAppearance;
  isLoading: boolean;
}

type ActionType =
  | {
      type: 'update_theme';
      payload: ThemeAppearance;
    }
  | {
      type: 'update_loading';
      payload: boolean;
    };

export const useThemeApperance = () => {
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(
    (state: State, action: ActionType) => {
      switch (action.type) {
        case 'update_theme':
          return {
            ...state,
            themeAppearance: action.payload,
          };
        case 'update_loading':
          return {
            ...state,
            isLoading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      themeAppearance: colorScheme ?? 'light',
      isLoading: false,
    },
  );
  const { configRepository } = useDatabaseRepo();

  const getConfiguredTheme = useCallback(
    async (themeOrCb: UpdateThemeParam) => {
      const appearance = await configRepository.getThemeApperance();
      const newTheme =
        typeof themeOrCb === 'function' ? themeOrCb(appearance) : themeOrCb;
      UnistylesRuntime.setTheme(
        newTheme === 'system' ? (colorScheme ?? 'light') : newTheme,
      );
      return newTheme;
    },
    [colorScheme, configRepository],
  );

  const updateThemeAppearance: (param: UpdateThemeParam) => void = useCallback(
    (themeOrCb) => {
      void (async () => {
        try {
          dispatch({ type: 'update_loading', payload: true });
          const newTheme = await getConfiguredTheme(themeOrCb);
          dispatch({ type: 'update_theme', payload: newTheme });
          await configRepository.setThemeApperance(newTheme);
        } finally {
          dispatch({ type: 'update_loading', payload: false });
        }
      })();
    },
    [configRepository, getConfiguredTheme],
  );

  return {
    ...state,
    updateThemeAppearance,
    getConfiguredTheme,
  };
};
