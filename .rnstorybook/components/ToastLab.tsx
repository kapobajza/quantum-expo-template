import React from 'react';

import { Button } from '@/components/Button';
import { Box } from '@/components/Container/Box';
import { useToast } from '@/components/Toast';

export const ToastLab = () => {
  const { showError, showSuccess } = useToast();

  return (
    <Box padding="md" gap="md">
      <Button
        onPress={() => {
          showError('This is an error toast');
        }}
        title="Show error toast"
      />
      <Button
        onPress={() => {
          showSuccess('Hello! I will not go away!', { duration: 'forever' });
        }}
        title="Show success toast (forever)"
      />
    </Box>
  );
};
