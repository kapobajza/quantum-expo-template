import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTrash = (props: SvgProps) => (
  <Svg viewBox="0 0 109.484 122.88" {...props}>
    <Path
      fillRule="evenodd"
      d="M2.347 9.633h38.297V3.76A3.77 3.77 0 0 1 44.404 0h21.144a3.77 3.77 0 0 1 3.76 3.76v5.874h37.83a2.353 2.353 0 0 1 2.347 2.349v11.514H0V11.982a2.354 2.354 0 0 1 2.347-2.349M8.69 29.605h92.921c1.937 0 3.696 1.599 3.521 3.524l-7.864 86.229c-.174 1.926-1.59 3.521-3.523 3.521h-77.3c-1.934 0-3.352-1.592-3.524-3.521L5.166 33.129c-.172-1.932 1.585-3.524 3.524-3.524m60.387 13.393h9.866v65.314h-9.866zm-39.005 0h9.867v65.314h-9.867zm19.5 0h9.869v65.314h-9.869z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgTrash;
