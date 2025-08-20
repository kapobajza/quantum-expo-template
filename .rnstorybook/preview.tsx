import type { Preview } from '@storybook/react';

import { AppProviders } from '@/components/App/AppProviders';
import { getAppEnv } from '@/env';
import { getDefaulServices } from '@/services/instance';
import { ThemeApperance } from '@/theme';

import { Background } from './components/Background';
import { withThemeSwitcher } from './theme/ThemeSwitcher';

const appEnv = getAppEnv();
const services = getDefaulServices();

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
    withThemeSwitcher,
    (Story) => {
      return (
        <AppProviders services={services} appEnv={appEnv}>
          <Background>
            <Story />
          </Background>
        </AppProviders>
      );
    },
  ],
  args: {
    theme: 'light' satisfies ThemeApperance,
  },
  argTypes: {
    theme: {
      options: ['light', 'dark'] satisfies ThemeApperance[],
      control: {
        type: 'select',
      },
    },
  },
};

export default preview;
