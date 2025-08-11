import { Meta, StoryObj } from '@storybook/react-native';

import { BottomSheetLab } from './BottomSheetLab';

const meta = {
  title: 'Labs/BottomSheet',
  component: BottomSheetLab,
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheetLab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
