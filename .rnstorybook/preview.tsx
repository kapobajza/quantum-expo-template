import type { Preview } from '@storybook/react';

import { ApiProvider } from '@/api/provider';
import { MigrationsRunner } from '@/components/App';
import { BottomSheetProvider } from '@/components/BottomSheet';
import { ToastProvider } from '@/components/Toast';
import { DatabaseProvider } from '@/db/DatabaseProvider';
import { databaseRepository, drizzleDb } from '@/db/instance';
import { AppEnvProvider } from '@/env';
import { I18nProvider } from '@/locale';
import { QueryFactoryProvider } from '@/query';
import { QueryProvider } from '@/query/QueryProvider';
import { ServicesProvider } from '@/services';
import { ThemeApperance, ThemeProvider } from '@/theme';
import { ModalProvider } from '@/components/Modal';

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
                            <ModalProvider>
                              <BottomSheetProvider>
                                <Background>
                                  <Story />
                                </Background>
                              </BottomSheetProvider>
                            </ModalProvider>
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
