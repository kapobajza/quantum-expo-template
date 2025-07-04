import { ScrollView } from 'react-native';

import { Container, ContainerProps } from './Container';

export type ScrollableContainerProps = ContainerProps;

export const ScrollableContainer = (props: ScrollableContainerProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container {...props} />
    </ScrollView>
  );
};
