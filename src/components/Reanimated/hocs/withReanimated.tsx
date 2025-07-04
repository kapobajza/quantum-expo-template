import type { ComponentType } from 'react';
import { Component } from 'react';
import Animated from 'react-native-reanimated';

const withReanimated = <TProps extends object>(
  WrappedComponent: ComponentType<TProps>,
) => {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name;

  class WithAnimated extends Component<TProps> {
    static displayName = `WithAnimated(${displayName})`;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animated.createAnimatedComponent<TProps>(WithAnimated);
};

export default withReanimated;
