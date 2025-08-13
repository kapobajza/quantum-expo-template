import { View } from 'react-native';

import { Text } from '@/components';
import { useMeQueryCached } from '@/hooks';
import { useDateTime } from '@/hooks/useDateTime';
import { createStyleSheet, useStyles } from '@/theme';
import { ChatMessageDto } from '@/types/api/chat.dto';

export const ChatBubble = ({ item }: { item: ChatMessageDto }) => {
  const styles = useStyles(stylesheet);
  const { data } = useMeQueryCached();
  const { formatDate } = useDateTime();

  const isSelf = data?.id === item.user.id;

  return (
    <View style={styles.root(isSelf)}>
      <Text variant="xSmall.medium" color="background.text.dimmed">
        {item.user.email}
      </Text>
      <View style={styles.container(isSelf)}>
        <Text
          color={isSelf ? 'surface.text.main' : 'greyscale.1000'}
          variant="small.medium"
        >
          {item.content}
        </Text>
      </View>
      <Text variant="xSmall.regular" style={styles.date(isSelf)}>
        {formatDate({
          date: item.created_at,
          formatString: 'HH:mm',
        })}
      </Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: (isSelf: boolean) => ({
    backgroundColor: isSelf
      ? theme.colors.surface.background
      : theme.colors.primary[25],
    padding: theme.spacing['4'],
    borderBottomLeftRadius: theme.radii['4'],
    borderBottomRightRadius: theme.radii['4'],
    borderTopLeftRadius: isSelf ? 0 : theme.radii['4'],
    borderTopRightRadius: isSelf ? theme.radii['4'] : 0,
    maxWidth: theme.spacing['2/3'],
  }),
  root: (isSelf: boolean) => ({
    gap: theme.spacing['2'],
    marginBottom: theme.spacing['4'],
    alignSelf: isSelf ? 'flex-start' : 'flex-end',
  }),
  date: (isSelf: boolean) => ({
    textAlign: isSelf ? 'left' : 'right',
    color: theme.colors.background.text.dimmed,
  }),
}));
