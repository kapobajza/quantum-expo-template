import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/context';

export const useChatHeaderHeight = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const height = theme.spacing['10'];

  return {
    height,
    spacing: insets.top + theme.spacing[2],
  };
};
