import { useState } from 'react';

import { ChangeLanguageBottomSheet } from '@/components/ChangeLanguage/ChangeLanguageBottomSheet';

import { BottomSheetList } from './BottomSheetList';
import { BottomSheetContext } from './context';
import { TestingBottomSheet } from './lab/TestingBottomSheet';
import { TestListBottomSheet } from './lab/TestListBottomSheet';
import { BottomSheetStack } from './types';

const stack: BottomSheetStack = {
  ChangeLanguage: ChangeLanguageBottomSheet,
  Testing: TestingBottomSheet,
  TestingList: TestListBottomSheet,
};

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [context, setContext] = useState<BottomSheetContext>({
    hideBottomSheet() {
      // no-op, will be overridden
    },
    showBottomSheet() {
      // no-op, will be overridden
    },
    closeAllBottomSheets() {
      // no-op, will be overridden
    },
  });

  return (
    <BottomSheetContext value={context}>
      {children}
      <BottomSheetList setContext={setContext} stack={stack} />
    </BottomSheetContext>
  );
};
