import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSend = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14 21 3M10 14l3.5 7a.55.55 0 0 0 1 0L21 3M10 14l-7-3.5a.55.55 0 0 1 0-1L21 3"
    />
  </Svg>
);
export default SvgSend;
