import type { Preview } from '@storybook/react';

import { ThemeProvider } from '@/theme';

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
    (Story) => (
      <ThemeProvider>
        <Background>
          <ThemeSwitcher />
          <Story />
        </Background>
      </ThemeProvider>
    ),
  ],
};

export default preview;
