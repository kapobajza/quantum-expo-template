import type { Preview } from '@storybook/react';

import { ApiProvider } from '@/api/provider';
import { MigrationsRunner } from '@/components/App';
import { ToastProvider } from '@/components/Toast';
import { DatabaseProvider } from '@/db/DatabaseProvider';
import { databaseRepository, drizzleDb } from '@/db/instance';
import { AppEnvProvider } from '@/env';
import { I18nProvider } from '@/locale';
import { QueryFactoryProvider } from '@/query';
import { QueryProvider } from '@/query/QueryProvider';
import { ServicesProvider } from '@/services';
import { ThemeApperance, ThemeProvider } from '@/theme';

import { Background } from './components/Background';
import { withThemeSwitcher } from './theme/ThemeSwitcher';

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
        <AppEnvProvider>
          <ServicesProvider>
            <MigrationsRunner database={drizzleDb}>
              <DatabaseProvider repository={databaseRepository}>
                <I18nProvider>
                  <ThemeProvider>
                    <ToastProvider>
                      <QueryProvider>
                        <ApiProvider>
                          <QueryFactoryProvider>
                            <Background>
                              <Story />
                            </Background>
                          </QueryFactoryProvider>
                        </ApiProvider>
                      </QueryProvider>
                    </ToastProvider>
                  </ThemeProvider>
                </I18nProvider>
              </DatabaseProvider>
            </MigrationsRunner>
          </ServicesProvider>
        </AppEnvProvider>
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
