import { Meta, StoryObj } from '@storybook/react-native';
import { fn } from 'storybook/test';

import { Container } from '@/components/Container';

import { Button } from './Button';
import { ButtonSize } from './variants';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  tags: ['autodocs'],
  args: { onPress: fn(), size: 'large', isLoading: false, disabled: false },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xSmall'] satisfies ButtonSize[],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Danger Button',
  },
};

export const DangerOutline: Story = {
  args: {
    variant: 'danger-outline',
    title: 'Danger Outline Button',
  },
};
