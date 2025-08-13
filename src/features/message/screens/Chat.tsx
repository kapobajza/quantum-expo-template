import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  KeyboardGestureArea,
  useKeyboardHandler,
} from 'react-native-keyboard-controller';
import Animated, {
  AnimatedProps,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, TextInput } from '@/components';
import { Box } from '@/components/Container/Box';
import { Icon } from '@/components/Icon';
import { FlashListProps, ListItem } from '@/components/List';
import { FlashList } from '@/components/List/FlashList';
import { withReanimated } from '@/components/Reanimated/hocs';
import { ChatBubble } from '@/features/message/components/ChatBubble';
import { ChatHeader } from '@/features/message/components/ChatHeader';
import { useSendMessage } from '@/features/message/components/useSendMessage';
import { useChatHeaderHeight } from '@/features/message/hooks/useChatHeaderHeight';
import { useGetChatMessages } from '@/features/message/hooks/useGetChatMessages';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles, useTheme } from '@/theme';
import { ChatMessageDto } from '@/types/api/chat.dto';

const AnimatedFlashList = withReanimated(FlashList) as React.ComponentClass<
  AnimatedProps<FlashListProps<ChatMessageDto>>
>;

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
    },
    onInteractive: (e) => {
      'worklet';

      progress.value = e.progress;
      height.value = e.height;
    },
  });

  return { height, progress };
};

const Chat = () => {
  const { results = [], listProps } = useGetChatMessages();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useStyles(stylesheet);
  const { t } = useTranslation();
  const { mutate: sendMessage } = useSendMessage();
  const [message, setMessage] = useState('');
  const chatHeaderHeight = useChatHeaderHeight();

  const { height: keyboardHeight, progress: keyboardAnimationProgress } =
    useKeyboardAnimation();

  const listStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: -keyboardHeight.value,
        },
        {
          rotate: '180deg',
        },
      ],
    }),
    [],
  );

  const emptyScrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: -keyboardHeight.value,
        },
      ],
    }),
    [],
  );

  const inputContainerStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -keyboardHeight.value }],
      marginBottom: interpolate(
        keyboardAnimationProgress.value,
        [0, 1],
        [insets.bottom + theme.spacing[2], theme.spacing[4]],
      ),
    }),
    [],
  );

  const itemSpacerStyle = useAnimatedStyle(
    () => ({
      height:
        keyboardHeight.value +
        chatHeaderHeight.height +
        chatHeaderHeight.spacing -
        theme.spacing[2],
    }),
    [],
  );

  return (
    <>
      <KeyboardGestureArea style={styles.fill} offset={50} interpolator="ios">
        <AnimatedFlashList
          {...listProps}
          refreshControl={undefined}
          onEndReached={undefined}
          data={results}
          renderItem={({ item }) => {
            return (
              <ListItem style={styles.rotate}>
                <ChatBubble item={item} />
              </ListItem>
            );
          }}
          ListEmptyComponent={
            <Animated.ScrollView
              style={emptyScrollViewStyle}
              contentContainerStyle={styles.scrollable}
              showsVerticalScrollIndicator={false}
            >
              <Animated.View style={itemSpacerStyle} />
              <Box fill center>
                <Text>{t('general.noResults')}</Text>
              </Box>
            </Animated.ScrollView>
          }
          style={listStyle}
          ListFooterComponent={<Animated.View style={itemSpacerStyle} />}
        />
      </KeyboardGestureArea>
      <Animated.View style={inputContainerStyle}>
        <View style={styles.buttomContainer}>
          <Box fill>
            <TextInput
              style={styles.inputRoot}
              containerStyle={styles.inputContainer}
              placeholder={t('chat.inputPlaceholder')}
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </Box>
          <Pressable
            style={styles.sendButton}
            onPress={() => {
              sendMessage(message);
              setMessage('');
            }}
            disabled={!message.trim()}
          >
            <Icon name={'Send'} width="5" height="5" />
          </Pressable>
        </View>
      </Animated.View>
      <ChatHeader />
    </>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    buttomContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: theme.spacing.md,
    },
    sendButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.primary[300],
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing[3],
    },
    fill: {
      flex: 1,
    },
    rotate: {
      transform: [{ rotate: '180deg' }],
    },
    inputRoot: {
      flex: 1,
    },
    inputContainer: {
      maxHeight: 80,
      minHeight: 52,
    },
    scrollable: {
      flexGrow: 1,
    },
  };
});

export default Chat;
