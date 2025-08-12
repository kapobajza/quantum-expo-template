import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUser = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0"
    />
  </Svg>
);
export default SvgUser;
