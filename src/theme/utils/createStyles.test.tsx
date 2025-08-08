import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppTheme, defaultTheme } from '@/theme';
import { ThemeProvider } from '@/theme/ThemeProvider';

import { createStyleSheet, useStyles } from './createStyles';
import { NamedStyles } from './types';

describe('createStyles', () => {
  // eslint-disable-next-line @eslint-react/hooks-extra/no-unnecessary-use-prefix
  const useStylesWithTheme = <TStyleSheet extends NamedStyles>(
    stylesheet: TStyleSheet | ((theme: AppTheme) => TStyleSheet),
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return renderHook(() => useStyles(stylesheet), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    }).result.current;
  };

  it('createDynamicStyles should work with regular object stylesheet', () => {
    const stylesheet = createStyleSheet({
      container: {
        flex: 1,
      },
    });

    const styles = useStylesWithTheme(stylesheet);

    expect(styles.container).toEqual({ flex: 1 });
  });

  it('createDynamicStyles should work with function stylesheet', () => {
    const stylesheet = createStyleSheet((theme) => ({
      container: {
        flex: 1,
        backgroundColor: theme.colors.greyscale[500],
      },
    }));

    const styles = useStylesWithTheme(stylesheet);

    expect(styles.container).toEqual({
      flex: 1,
      backgroundColor: defaultTheme.colors.greyscale[500],
    });
  });

  it('createDynamicStyles should work with dynamic style param', () => {
    const stylesheet = createStyleSheet((theme) => ({
      container: {
        flex: 1,
        backgroundColor: theme.colors.primary[300],
      },
      text: ({ color }: { color: string }) => ({ color }),
    }));

    const styles = useStylesWithTheme(stylesheet);

    expect(styles.container).toEqual({
      flex: 1,
      backgroundColor: defaultTheme.colors.primary[300],
    });
    expect(styles.text({ color: 'red' })).toEqual({ color: 'red' });
  });
});
