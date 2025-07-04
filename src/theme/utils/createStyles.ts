import { StyleSheet } from 'react-native';

import { AppTheme } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

import { ExtractStyles, NamedStyles, RNNamedStyles } from './types';

/**
 * This is just a wrapper function to deal with the types
 * @param stylesheet The object or function that contain the styles
 * @returns The `stylesheet` param
 */
export const createStyleSheet = <TStyleSheet extends NamedStyles>(
  stylesheet: TStyleSheet | ((theme: AppTheme) => TStyleSheet),
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
export const useStyles = <TStyleSheet extends NamedStyles>(
  stylesheet: TStyleSheet | ((theme: AppTheme) => TStyleSheet),
): ExtractStyles<TStyleSheet> => {
  const theme = useTheme();
  const parsedStyles =
    typeof stylesheet === 'function' ? stylesheet(theme) : stylesheet;

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
