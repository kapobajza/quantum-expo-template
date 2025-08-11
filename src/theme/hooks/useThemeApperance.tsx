import { useReducer } from 'react';
import { useColorScheme } from 'react-native';

import { useDatabaseRepo } from '@/db/context';
import { useMountEffect } from '@/hooks';
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

  const updateThemeAppearance: ThemeContext['updateTheme'] = (themeOrCb) => {
    void (async () => {
      try {
        dispatch({ type: 'update_loading', payload: true });
        const appearance = await configRepository.getThemeApperance();
        const newTheme =
          typeof themeOrCb === 'function' ? themeOrCb(appearance) : themeOrCb;
        dispatch({ type: 'update_theme', payload: newTheme });
        await configRepository.setThemeApperance(newTheme);
      } finally {
        dispatch({ type: 'update_loading', payload: false });
      }
    })();
  };

  useMountEffect(() => {
    updateThemeAppearance((prev) => prev ?? colorScheme ?? 'light');
  });

  return {
    ...state,
    updateThemeAppearance,
  };
};
