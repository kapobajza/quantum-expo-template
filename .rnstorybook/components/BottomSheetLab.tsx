import React from 'react';

import { Button } from '@/components';
import { useBottomSheet } from '@/components/BottomSheet';
import { Box } from '@/components/Container/Box';

export const BottomSheetLab = () => {
  const { showBottomSheet } = useBottomSheet();
  return (
    <Box padding="md">
      <Button
        onPress={() => {
          showBottomSheet('ChangeLanguage');
        }}
        title="Open change language bottom sheet"
      />
    </Box>
  );
};
