import { View } from 'react-native';

import { BottomSheetContainer } from '@/components/BottomSheet/BottomSheetContainer';
import { BottomSheetView } from '@/components/BottomSheet/BottomSheetView';
import {
  useBottomSheet,
  useBottomSheetParams,
} from '@/components/BottomSheet/context';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';

export const TestingBottomSheet = () => {
  const { testId } = useBottomSheetParams('Testing');
  const { showBottomSheet } = useBottomSheet();

  return (
    <BottomSheetContainer>
      <BottomSheetView>
        <View>
          <Text>Hello from this bottom sheet. Test id: {testId}</Text>
          <Button
            title="Open change language bottom sheet"
            onPress={() => {
              showBottomSheet('ChangeLanguage');
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetContainer>
  );
};
