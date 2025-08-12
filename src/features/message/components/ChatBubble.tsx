import { View } from 'react-native';

import { Text } from '@/components';
import { createStyleSheet, useStyles } from '@/theme';
import { ChatMessageDto } from '@/types/api/chat.dto';

export const ChatBubble = ({ item }: { item: ChatMessageDto }) => {
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text variant="xSmall.medium" color="background.text.dimmed">
        {item.users_conversations[0].email}
      </Text>
      <View style={styles.container}>
        <Text color="surface.text.main" variant="small.medium">
          {item.content}
        </Text>
      </View>
      <Text variant="xSmall.regular">
        {new Date(item.created_at).toDateString()}
      </Text>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.surface.background,
    padding: theme.spacing['4'],
    borderRadius: theme.radii['4'],
    maxWidth: theme.spacing['2/3'],
  },
  root: {
    gap: theme.spacing['2'],
    marginBottom: theme.spacing['4'],
    alignSelf: 'flex-start',
  },
}));
