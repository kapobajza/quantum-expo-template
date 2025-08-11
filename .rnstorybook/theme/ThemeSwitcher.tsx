/* eslint-disable react-hooks/rules-of-hooks */
import { STORY_ARGS_UPDATED } from 'storybook/internal/core-events';
import { useChannel } from 'storybook/internal/preview-api';

import { ThemeApperance, useThemeOptions } from '@/theme';

export const withThemeSwitcher = (Story: React.ComponentType) => {
  const { updateTheme } = useThemeOptions();

  useChannel({
    [STORY_ARGS_UPDATED]: ({ args }: { args: { theme: ThemeApperance } }) => {
      updateTheme(args.theme);
    },
  });

  return <Story />;
};
