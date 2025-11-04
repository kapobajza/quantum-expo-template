import {
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';

import { BottomSheetContainer } from '@/components/BottomSheet/BottomSheetContainer';
import {
  useBottomSheet,
  useBottomSheetParams,
} from '@/components/BottomSheet/context';
import { Button } from '@/components/Button';
import { ListItem } from '@/components/List';
import { BottomSheetFlatList } from '@/components/List/BottomSheetFlatList';
import { Text } from '@/components/Text';

export const TestListBottomSheet = () => {
  const { showBottomSheet } = useBottomSheet();
  const { itemCount } = useBottomSheetParams('TestingList');

  const listMockData: string[] = Array.from({ length: itemCount }).map(
    (_, i) => `Item ${i + 1}`,
  );

  return (
    <BottomSheetContainer
      footerComponent={(props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={8}>
          <Button
            title="Change language"
            onPress={() => {
              showBottomSheet('ChangeLanguage');
            }}
            style={{ marginHorizontal: 16 }}
          />
        </BottomSheetFooter>
      )}
      enableDynamicSizing={false}
      snapPoints={['50%', '70%']}
    >
      <BottomSheetFlatList
        data={listMockData}
        renderItem={({ item }) => {
          return (
            <ListItem>
              <Text>{item}</Text>
            </ListItem>
          );
        }}
        bottomSpacing="6"
        topSpacing="0"
      />
    </BottomSheetContainer>
  );
};
