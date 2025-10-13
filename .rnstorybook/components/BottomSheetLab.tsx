import React from 'react';

import { Button } from '@/components';
import { useBottomSheet } from '@/components/BottomSheet';
import { Box } from '@/components/Container/Box';

export const BottomSheetLab = () => {
  const { showBottomSheet } = useBottomSheet();
  return (
    <Box padding="md" gap="md">
      <Button
        onPress={() => {
          showBottomSheet('Testing', {
            payload: {
              testId: '12345',
            },
          });
        }}
        title="Open bottom sheet"
      />
      <Button
        onPress={() => {
          showBottomSheet('TestingList', {
            payload: {
              itemCount: 20,
            },
          });
        }}
        title="Open list bottom sheet"
      />
    </Box>
  );
};
