import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';
import { createStyleSheet, useStyles } from '@/theme';
import { ThemeColor } from '@/theme/tokens/colors';

import { TabBarOptionsMap } from './types';

interface TabBarProps extends BottomTabBarProps {
  options: TabBarOptionsMap;
}

export const TabBar = ({
  state,
  navigation,
  options: tabBarOptions,
}: TabBarProps) => {
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onItemPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true } as never);
          }
        };

        const options = tabBarOptions[route.name];

        const color: ThemeColor = isFocused
          ? 'background.text.main'
          : 'background.text.out';

        return (
          <Pressable key={route.name} onPress={onItemPress} style={styles.item}>
            <Icon name={options.icon} size="6" color={color} />
            {options.name && (
              <Text variant="xSmall.semibold" color={color}>
                {options.name}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet((theme, { insets }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing['2'],
    paddingTop: theme.spacing['2'],
    alignItems: 'center',
    paddingBottom: insets.bottom + theme.spacing['2'],
    backgroundColor: theme.colors.background.main,
    ...theme.shadows.xLarge,
  },
  item: {
    padding: theme.spacing['2'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing['1'],
    borderRadius: theme.radii.full,
  },
}));
