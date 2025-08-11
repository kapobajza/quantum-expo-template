import { useColorScheme } from 'react-native';

import { useDatabaseRepo } from '@/db/context';
import { ThemeApperance } from '@/theme';

import { createQueryOptionsFactory } from './factory';

export const createConfigQueryOptions = createQueryOptionsFactory(
  'configs',
  () => {
    const { configRepository } = useDatabaseRepo();
    const colorScheme = useColorScheme();

    return {
      theme: {
        queryKey: ['theme'],
        async queryFn() {
          const themeAppearance = await configRepository.getThemeApperance();
          const result: ThemeApperance =
            themeAppearance ?? colorScheme ?? 'light';

          return result;
        },
      },
    };
  },
);
