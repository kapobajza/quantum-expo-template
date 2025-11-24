import { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@/components/Text';
import { lightThemeColors } from '@/theme/tokens/colors';
import { spacing } from '@/theme/tokens/spacing';

import { Icon } from './Icon';
import * as iconName from './raw';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

const getFlattenedColors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: Record<string, any>,
  prefix = '',
): string[] => {
  return Object.entries(colors).flatMap(([key, value]) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      return [newPrefix];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return getFlattenedColors(value, newPrefix);
  });
};

export const AllIcons: Story = {
  args: {
    color: 'background.text.main',
    name: 'AlertCircle',
  },
  argTypes: {
    color: {
      control: 'select',
      options: getFlattenedColors(lightThemeColors),
      type: 'string',
    },
    name: {
      if: {
        arg: 'name',
        eq: false,
      },
    },
  },
  render: ({ color }) => {
    return (
      <ScrollView>
        <View style={allIconsStyles.container}>
          {Object.keys(iconName).map((name) => {
            return (
              <View key={name} style={allIconsStyles.iconWrapper}>
                <Icon
                  name={name as keyof typeof iconName}
                  color={color}
                  size="6"
                />
                <Text style={allIconsStyles.title} center>
                  {name}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  },
};

const allIconsStyles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing('4'),
    margin: theme.spacing('4'),
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.background.text.out,
    paddingVertical: theme.spacing('2'),
    borderRadius: theme.radii[2],
    gap: theme.spacing('2'),
    width: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
  },
}));

export const Default: Story = {
  args: {
    name: 'AlertCircle',
    size: '8',
    color: 'background.text.main',
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(iconName),
    },
    color: {
      control: 'select',
      options: getFlattenedColors(lightThemeColors),
      type: 'string',
    },
    size: {
      control: 'select',
      options: Object.keys(spacing).filter((key) => !key.includes('-')),
    },
  },
  render: (args) => <Icon {...args} style={defaultIconStyles.icon} />,
};

const defaultIconStyles = StyleSheet.create((theme) => ({
  icon: {
    margin: theme.spacing('4'),
  },
}));
