import { Link } from '@/components/Link';

import { Text } from './Text';
import type {
  CustomParseShape,
  DefaultParseShape,
  ParsedTextProps,
} from './types';
import { extractParsedText, PARSED_REGEX_TEXT_PATTERNS } from './util';

export const ParsedText = ({ ref, ...props }: ParsedTextProps) => {
  const { parse, children } = props;

  const getPatterns = () => {
    return (parse ?? []).map((option) => {
      const { type, ...patternOption } = option as Partial<DefaultParseShape>;

      if (type) {
        (patternOption as CustomParseShape).pattern =
          PARSED_REGEX_TEXT_PATTERNS[type];
      }

      return patternOption as CustomParseShape;
    });
  };

  const getParsedText = () => {
    if (!parse) {
      return children;
    }

    if (typeof children !== 'string') {
      return children;
    }

    return extractParsedText(children, getPatterns()).map(
      (extractedProps, index) => {
        const Component = extractedProps.href ? Link : Text;
        return (
          // @ts-expect-error - Cannot infer props properly
          <Component
            // eslint-disable-next-line @eslint-react/no-array-index-key
            key={`parsedText-${index}`}
            {...props}
            {...extractedProps}
          />
        );
      },
    );
  };

  return (
    <Text ref={ref} {...props}>
      {getParsedText()}
    </Text>
  );
};

export default ParsedText;
