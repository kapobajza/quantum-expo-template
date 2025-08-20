import React from 'react';

import { Text } from '@/components/Text';
import { TextProps } from '@/components/Text/types';

export const HeaderTitle = (props: TextProps) => {
  return <Text variant="h6" {...props} />;
};
