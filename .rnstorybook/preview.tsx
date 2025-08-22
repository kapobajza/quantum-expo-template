import type { Preview } from '@storybook/react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { AppProviders } from '@/components/App/AppProviders';
import { getAppEnv } from '@/env';
import { getDefaulServices } from '@/services/instance';
import { ThemeAppearance } from '@/theme/types';

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
    theme: UnistylesRuntime.themeName,
  },
  argTypes: {
    theme: {
      options: ['light', 'dark'] satisfies ThemeAppearance[],
      control: {
        type: 'select',
      },
    },
  },
};

export default preview;
