import { Icon } from '@/components/Icon';
import { useModal } from '@/components/Modal';
import { Pressable } from '@/components/Pressable';
import { createStyleSheet, useStyles } from '@/theme';

interface ChangeLanguageButtonProps {
  topOffset?: number;
}

export const ChangeLanguageButton = ({
  topOffset,
}: ChangeLanguageButtonProps) => {
  const { showModal } = useModal();
  const styles = useStyles(stylesheet);

  return (
    <Pressable
      style={styles.button({ topOffset })}
      onPress={() => {
        showModal('ChangeLanguage');
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
