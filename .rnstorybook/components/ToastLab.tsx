import React from 'react';

import { Button } from '@/components/Button';
import { Box } from '@/components/Container/Box';
import { useToast } from '@/components/Toast';

export const ToastLab = () => {
  const { showError } = useToast();

  return (
    <Box padding="md" gap="md">
      <Button
        onPress={() => {
          showError('This is an error toast');
        }}
        title="Show error toast"
      />
    </Box>
  );
};
