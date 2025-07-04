import { Pressable } from 'react-native';

import { withReanimated } from './hocs';

export const ReanimatedPressable = withReanimated(Pressable);

export type ReanimatedPressableProps = React.ComponentProps<
  typeof ReanimatedPressable
>;
