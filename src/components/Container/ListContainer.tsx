import { createStyleSheet, useStyles } from '@/theme';

import { Container, ContainerProps } from './Container';

export const ListContainer = ({ style, ...props }: ContainerProps) => {
  const styles = useStyles(stylesheet);

  return <Container {...props} style={[styles.root, style]} />;
};

const stylesheet = createStyleSheet({
  root: {
    marginTop: 0,
  },
});
