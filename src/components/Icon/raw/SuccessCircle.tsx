import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSuccessCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="currentColor"
      d="M9.75 0a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 9.75 0m4.28 8.03-5.25 5.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.751.751 0 0 1 1.06 1.06"
    />
  </Svg>
);
export default SvgSuccessCircle;
