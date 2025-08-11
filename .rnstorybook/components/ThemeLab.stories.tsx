import { Meta, StoryObj } from '@storybook/react-native';

import { ThemeLab } from './ThemeLab';

const meta = {
  title: 'Labs/Theme',
  component: ThemeLab,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeLab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
