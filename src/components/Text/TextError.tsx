import React from 'react';

import { Box } from '@/components/Container/Box';
import { Icon } from '@/components/Icon';

import { Text } from './Text';
import { TextProps } from './types';

export interface TextErrorProps extends TextProps {
  error: string | undefined;
}

export const TextError = ({ error, ...rest }: TextErrorProps) => {
  return error ? (
    <Box flexDirection="row" alignItems="center" gap="1">
      <Icon name="AlertCircle" color="error.100" />
      <Text variant="small.regular" color="error.100" {...rest}>
        {error}
      </Text>
    </Box>
  ) : null;
};
