import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { createStyleSheet, useStyles } from '@/theme';
import { useBottomSheet } from '@/components/BottomSheet';

interface ChangeLanguageButtonProps {
  topOffset?: number;
}

export const ChangeLanguageButton = ({
  topOffset,
}: ChangeLanguageButtonProps) => {
  const { showBottomSheet } = useBottomSheet();
  const styles = useStyles(stylesheet);

  return (
    <Pressable
      style={styles.button({ topOffset })}
      onPress={() => {
        showBottomSheet('ChangeLanguage');
      }}
      scaleOutputRange={[0.95, 1]}
    >
      <Icon name="GlobeLine" size="7" />
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme, { insets }) => ({
  button: ({
    topOffset = 0,
  }: Pick<ChangeLanguageButtonProps, 'topOffset'>) => ({
    position: 'absolute',
    right: theme.spacing['4'],
    top: insets.top + topOffset + theme.spacing['4'],
    zIndex: theme.zIndex.high,
  }),
}));
