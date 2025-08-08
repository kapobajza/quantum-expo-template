import type { Preview } from '@storybook/react';
import { useArgs } from 'storybook/internal/preview-api';

import { ThemeApperance, ThemeProvider } from '@/theme';

import { Background } from './components/Background';
import { ThemeSwitcher } from './theme/ThemeSwitcher';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      const [args] = useArgs<{ theme: ThemeApperance }>();

      return (
        <ThemeProvider>
          <Background>
            <ThemeSwitcher theme={args.theme} />
            <Story />
          </Background>
        </ThemeProvider>
      );
    },
  ],
  args: {
    theme: 'light' satisfies ThemeApperance,
  },
  argTypes: {
    theme: {
      // @ts-expect-error - Storybook types are not fully compatible with our theme type
      type: 'select',
      options: ['light', 'dark'] satisfies ThemeApperance[],
    },
  },
};

export default preview;
