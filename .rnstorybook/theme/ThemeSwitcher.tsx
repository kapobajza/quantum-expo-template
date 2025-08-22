/* eslint-disable react-hooks/rules-of-hooks */
import { STORY_ARGS_UPDATED } from 'storybook/internal/core-events';
import { useChannel } from 'storybook/internal/preview-api';

import { useThemeApperance } from '@/theme/hooks/useThemeApperance';
import { ThemeAppearance } from '@/theme/types';

export const withThemeSwitcher = (Story: React.ComponentType) => {
  const { updateThemeAppearance } = useThemeApperance();

  useChannel({
    [STORY_ARGS_UPDATED]: ({ args }: { args: { theme: ThemeAppearance } }) => {
      updateThemeAppearance(args.theme);
    },
  });

  return <Story />;
};
