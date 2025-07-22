import { ScaledSize, StyleSheet, useWindowDimensions } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTheme } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { ExtractStyles, NamedStyles, RNNamedStyles } from './types';

type StyleSheetFunction<T> = (
  theme: AppTheme,
  options: {
    insets: EdgeInsets;
    dimensions: ScaledSize;
  },
) => T;

/**
 * This is just a wrapper function to deal with the types
 * @param stylesheet The object or function that contain the styles
 * @returns The `stylesheet` param
 */
export const createStyleSheet = <const TStyleSheet extends NamedStyles>(
  stylesheet: TStyleSheet | StyleSheetFunction<TStyleSheet>,
): TStyleSheet => {
  if (typeof stylesheet === 'function') {
    return stylesheet as unknown as TStyleSheet;
  }

  return stylesheet;
};

/**
 * The main hook that creates the styles. It takes a stylesheet object or function and returns the generated styles.
 * @param stylesheet The object or function that contain the styles
 * @returns The parsed React Native StyleSheet object
 * @example
 * // It can be used identical to the `StyleSheet.create` function
 * const MyComponent = () => {
 *   const styles = useStyles(stylesheet);
 *
 *    return (
 *      <View style={styles.container}>
 *        <Text style={styles.text}>Hello, world!</Text>
 *      </View>
 *    );
 * }
 *
 * const stylesheet = createStyleSheet({
 *   container: {
 *     flex: 1,
 *   },
 *   text: {
 *     fontSize: 16,
 *     fontWeight: 'bold',
 *   },
 * });
 *
 * @example
 * // Or it can be used with the theme param provided to the `createStyleSheet` function
 * const MyComponent = ({ someProp }: { someProp: string }) => {
 *   const styles = useStyles(stylesheet);
 *
 *    return (
 *      <View style={styles.container(someProp)}>
 *        <Text style={styles.text}>Hello, world!</Text>
 *      </View>
 *    );
 * }
 *
 * const stylesheet = createStyleSheet((theme) => ({
 *   // If you need to pass a prop, state or any variable to your styles
 *   // in a typesafe manner, you can do it like this
 *   container: (someProp: string) => ({
 *     flex: 1,
 *     backgroundColor: someProp === 'something' ? theme.colors.secondary : theme.colors.primary,
 *     padding: theme.spacing['4'],
 *   }),
 *   text: {
 *     fontSize: theme.fontSize['16'],
 *     fontWeight: theme.fontWeight.bold,
 *     color: theme.colors.text,
 *   },
 * }));
 */
export const useStyles = <const TStyleSheet extends NamedStyles>(
  stylesheet: TStyleSheet | StyleSheetFunction<TStyleSheet>,
): ExtractStyles<TStyleSheet> => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const parsedStyles =
    typeof stylesheet === 'function'
      ? stylesheet(theme, { insets, dimensions })
      : stylesheet;

  const dynamicStyles = Object.entries(parsedStyles).reduce(
    (acc, [key, value]) => {
      const parsedValue =
        typeof value === 'function'
          ? (...args: never[]) => value(...args)
          : value;

      return {
        ...acc,
        [key]: parsedValue,
      };
    },
    {},
  );

  return StyleSheet.create(
    dynamicStyles as RNNamedStyles,
  ) as ExtractStyles<TStyleSheet>;
};
