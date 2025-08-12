import { Redirect } from 'expo-router';
import React, { ComponentProps } from 'react';

import { Box } from '@/components/Container';

const RedirectWithBg = (props: ComponentProps<typeof Redirect>) => {
  return (
    <Box backgroundColor="background.main" fill>
      <Redirect {...props} />
    </Box>
  );
};

export default RedirectWithBg;
