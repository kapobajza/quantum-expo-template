import { Meta, StoryObj } from '@storybook/react-native';

import { ToastLab } from './ToastLab';

const meta = {
  title: 'Labs/Toast',
  component: ToastLab,
  tags: ['autodocs'],
} satisfies Meta<typeof ToastLab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
