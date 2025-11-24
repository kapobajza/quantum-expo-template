import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAlertCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="currentColor"
      d="M9.75 0a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 9.75 0M9 5.25a.75.75 0 0 1 1.5 0v5.25a.75.75 0 1 1-1.5 0zM9.75 15a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25"
    />
  </Svg>
);
export default SvgAlertCircle;
