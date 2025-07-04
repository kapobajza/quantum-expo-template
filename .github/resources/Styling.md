# App styling guide

The styling of the app is heavily inspired by the already existing solution provided by [`react-native-unistyles@v2`](https://v2.unistyl.es/start/introduction/). The reason for not using it directly is because of simplicity.

## Usage

When you want to style your component, you can use the `createStyleSheet` with the `useStyles` hook. You can use it the same way as the default `StyleSheet.create` function provided by React Native:

```tsx
import { createStyleSheet, useStyles } from '@/theme';

const MyComponent = () => {
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});
```

Or when you need access to the theme (like colors, spacing, etc.) you can use it like this:

```tsx
import { createStyleSheet, useStyles } from '@/theme';

const MyComponent = () => {
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing['4'],
  },
  text: {
    color: theme.colors.text,
    marginTop: theme.spacing['4'],
    gap: theme.spacing['2'],
  },
}));
```

Additionally, if your styling depends on an external variable, like a prop or state or similar, you can pass those variables to `createStyleSheet` like this:

```tsx
import { createStyleSheet, useStyles } from '@/theme';

const MyComponent = ({ myProp }: { myProp: boolean }) => {
  const [myState, setMyState] = useState(false);
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.container(myProp)}>
      <Text style={styles.text(myState)}>Hello, world!</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: (myProp: boolean) => ({
    flex: 1,
    backgroundColor: myProp ? theme.colors.primary : theme.colors.secondary,
  }),
  text: (myState: boolean) => ({
    color: myState ? theme.colors.primary : theme.colors.secondary,
  }),
}));
```

## Theme tokens

The theme object has several tokens (besides the colors) that can be helpful in achieveing a consistent look and feel for the UI.

- `spacing`: Spacing tokens for margins, paddings, gaps, etc. **NOTE** Spacings are multiplied by 4, so `spacing[4]` is actually `16`. The reason for this is to have a more consistent look and feel for the UI and to have a better overall experience for the user. [Read more about it here](https://www.thedesignership.com/blog/the-ultimate-spacing-guide-for-ui-designers)
- `zIndex`: Z-index tokens for layers
- `fontSize`: Font size tokens for text
- `fontWeight`: Font weight tokens for text

