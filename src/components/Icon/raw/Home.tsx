import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHome = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.875 21.5v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6m-10-9h-2l9-9 9 9h-2v7a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z"
    />
  </Svg>
);
export default SvgHome;
