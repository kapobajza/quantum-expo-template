import { StyleSheet } from 'react-native-unistyles';

import { Container, ContainerProps } from './Container';

export const ListContainer = ({ style, ...props }: ContainerProps) => {
  return (
    <Container {...props} style={StyleSheet.compose(styles.root, style)} />
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 0,
  },
});
