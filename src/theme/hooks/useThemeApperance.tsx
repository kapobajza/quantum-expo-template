import { useCallback, useEffect, useReducer } from 'react';
import { useColorScheme } from 'react-native';

import { useDatabaseRepo } from '@/db/context';
import { ThemeApperance, ThemeContext } from '@/theme/context';

interface State {
  themeAppearance: ThemeApperance;
  isLoading: boolean;
  isInitialLoading: boolean;
}

type ActionType =
  | {
      type: 'update_theme';
      payload: ThemeApperance;
    }
  | {
      type: 'update_loading';
      payload: boolean;
    }
  | {
      type: 'update_initial_loading';
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
        case 'update_initial_loading':
          return {
            ...state,
            isInitialLoading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      themeAppearance: colorScheme ?? 'light',
      isLoading: false,
      isInitialLoading: true,
    },
  );
  const { configRepository } = useDatabaseRepo();

  const getConfiguredTheme = useCallback(
    async (themeOrCb: Parameters<ThemeContext['updateTheme']>[0]) => {
      const appearance = await configRepository.getThemeApperance();
      const newTheme =
        typeof themeOrCb === 'function' ? themeOrCb(appearance) : themeOrCb;
      return newTheme;
    },
    [configRepository],
  );

  const updateThemeAppearance: ThemeContext['updateTheme'] = useCallback(
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

  useEffect(() => {
    void (async () => {
      try {
        const newTheme = await getConfiguredTheme(
          (prev) => prev ?? colorScheme ?? 'light',
        );
        dispatch({ type: 'update_theme', payload: newTheme });
      } finally {
        dispatch({ type: 'update_initial_loading', payload: false });
      }
    })();
  }, [colorScheme, getConfiguredTheme]);

  return {
    ...state,
    updateThemeAppearance,
  };
};
