import { useCallback, useEffect, useReducer } from 'react';
import { useColorScheme } from 'react-native';

import { useDatabaseRepo } from '@/db/context';
import { ThemeApperance, ThemeContext } from '@/theme/context';

interface State {
  themeAppearance: ThemeApperance | undefined;
  isLoading: boolean;
}

type ActionType =
  | {
      type: 'update_theme';
      payload: ThemeApperance | undefined;
    }
  | {
      type: 'update_loading';
      payload: boolean;
    };

export const useThemeApperance = () => {
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
      themeAppearance: undefined,
      isLoading: true,
    },
  );
  const { configRepository } = useDatabaseRepo();
  const colorScheme = useColorScheme();

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
        dispatch({ type: 'update_loading', payload: true });
        const newTheme = await getConfiguredTheme(
          (prev) => prev ?? colorScheme ?? 'light',
        );
        dispatch({ type: 'update_theme', payload: newTheme });
      } finally {
        dispatch({ type: 'update_loading', payload: false });
      }
    })();
  }, [colorScheme, getConfiguredTheme]);

  return {
    ...state,
    updateThemeAppearance,
  };
};
