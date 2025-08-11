import React from 'react';

import { TextInput } from '@/components';
import { ScrollableContainer } from '@/components/Container';
import { Box } from '@/components/Container/Box';
import { Text } from '@/components/Text';

export const ThemeLab = () => {
  return (
    <ScrollableContainer>
      <Box gap="4">
        <Text variant="h4">Main text sample</Text>
        <Text variant="h4" color="background.text.dimmed">
          Dimmed text sample
        </Text>
        <Box backgroundColor="surface.background" padding="4">
          <Text variant="h5" color="surface.text.main">
            Surface text sample
          </Text>
        </Box>
        <TextInput placeholder="Primary variant" variant="primary" />
        <TextInput placeholder="Chat variant" variant="chat" />
      </Box>
    </ScrollableContainer>
  );
};
