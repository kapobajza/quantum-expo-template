import { Stack } from 'expo-router';
import React from 'react';

import { StackNoHeader } from '@/components/Navigation';

const AuthLayout = () => {
  return (
    <StackNoHeader>
      <Stack.Screen name="login" />
    </StackNoHeader>
  );
};

export default AuthLayout;
