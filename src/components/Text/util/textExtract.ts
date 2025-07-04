import type {
  CustomParseShape,
  ParseShape,
  TextProps,
} from '@/components/Text/types';

function getMatchedPart({
  matchedPattern,
  text,
  matches,
  index,
  removeMatchedTags,
}: {
  matchedPattern: ParseShape;
  text: string;
  matches: string[];
  index: number;
  removeMatchedTags: boolean | undefined;
}) {
  const props: Record<string, unknown> = {};

  Object.keys(matchedPattern).forEach((key) => {
    if (
      key === 'pattern' ||
      key === 'renderText' ||
      key === 'nonExhaustiveModeMaxMatchCount'
    ) {
      return;
    }

    const matchedPatternKey = key as keyof ParseShape;

    if (typeof matchedPattern[matchedPatternKey] === 'function') {
      // Support onPress / onLongPress functions
      props[key] = () => {
        (
          matchedPattern[matchedPatternKey] as (
            text: string,
            index: number,
          ) => void
        )(text, index);
      };
    } else {
      // Set a prop with an arbitrary name to the value in the match-config
      props[key] = matchedPattern[matchedPatternKey];
    }
  });

  let children = text;

  if (
    matchedPattern.renderText &&
    typeof matchedPattern.renderText === 'function'
  ) {
    children = matchedPattern.renderText(text, matches) as string;
  }

  if (removeMatchedTags && !matchedPattern.renderText) {
    children = matches[1] ?? '';
  }

  return {
    ...props,
    children,
    _matched: true,
  };
}

type ParsedTextInnerProps = TextProps &
  Pick<CustomParseShape, 'href'> & {
    _matched?: boolean;
  };

export function extractParsedText(text: string, shapes: CustomParseShape[]) {
  let parsedTexts: ParsedTextInnerProps[] = [{ children: text }];
  shapes.forEach((shape) => {
    const newParts: ParsedTextInnerProps[] = [];

    const tmp = shape.nonExhaustiveModeMaxMatchCount ?? 0;

    const numberOfMatchesPermitted = Math.min(
      Math.max(Number.isInteger(tmp) ? tmp : 0, 0) || Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    );

    let currentMatches = 0;

    parsedTexts.forEach((parsedText) => {
      // Only allow for now one parsing
      if (parsedText._matched) {
        newParts.push(parsedText);

        return;
      }

      const parts = [];
      let textLeft = parsedText.children as string;
      let indexOfMatchedString = 0;

      let matches: RegExpExecArray | null;
      // Global RegExps are stateful, this makes it start at 0 if reused
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
      shape.pattern.lastIndex = 0;

      while (textLeft && (matches = shape.pattern.exec(textLeft))) {
        const previousText = textLeft.substring(0, matches.index);
        indexOfMatchedString = matches.index;

        if (++currentMatches > numberOfMatchesPermitted) {
          // Abort if we've exhausted our number of matches
          break;
        }

        const firstMatch = matches[0] || '';

        parts.push({ children: previousText });

        parts.push(
          getMatchedPart({
            matchedPattern: shape,
            text: firstMatch,
            matches,
            index: indexOfMatchedString,
            removeMatchedTags: shape.removeMatchingTags,
          }),
        );

        textLeft = textLeft.substring(matches.index + firstMatch.length);
        indexOfMatchedString += firstMatch.length - 1;
        // Global RegExps are stateful, this makes it operate on the "remainder" of the string
        shape.pattern.lastIndex = 0;
      }

      parts.push({ children: textLeft, href: parsedText.href });

      newParts.push(...parts);
    });

    parsedTexts = newParts;
  });

  // Remove _matched key.
  parsedTexts.forEach((parsedText) => delete parsedText._matched);

  return parsedTexts.filter((t) => !!t.children);
}
