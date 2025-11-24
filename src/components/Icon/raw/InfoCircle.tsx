import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgInfoCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="currentColor"
      d="M9.75 0a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 9.75 0m-.375 4.5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25M10.5 15A1.5 1.5 0 0 1 9 13.5V9.75a.75.75 0 0 1 0-1.5 1.5 1.5 0 0 1 1.5 1.5v3.75a.75.75 0 1 1 0 1.5"
    />
  </Svg>
);
export default SvgInfoCircle;
