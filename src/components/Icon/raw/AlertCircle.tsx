import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAlertCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 5.333V8m0 2.667h.007M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8"
    />
  </Svg>
);
export default SvgAlertCircle;
