import { useEffect } from 'react';

import { BottomSheetContainer } from './BottomSheetContainer';
import { BottomSheetContext } from './context';
import { useBottomSheetStore } from './store';
import {
  BottomSheetActionType,
  BottomSheetArguments,
  BottomSheetStack,
} from './types';

interface BottomSheetListProps {
  setContext: (context: BottomSheetContext) => void;
  stack: BottomSheetStack;
}

export const BottomSheetList = ({
  setContext,
  stack,
}: BottomSheetListProps) => {
  const { sheets, dispatch, pendingCloseQueue } = useBottomSheetStore();

  useEffect(() => {
    setContext({
      hideBottomSheet: (name) => {
        dispatch({
          type: BottomSheetActionType.Dismiss,
          name,
        });
      },
      showBottomSheet: (...args) => {
        const [name, opts] = args;
        const { payload: params, options } = (opts ??
          {}) as BottomSheetArguments<object>;

        dispatch({
          type: BottomSheetActionType.Show,
          item: {
            name,
            Component: stack[name],
            params: params as never,
            options,
          },
        });
      },
      closeAllBottomSheets() {
        dispatch({
          type: BottomSheetActionType.DismisAll,
        });
      },
    });
  }, [dispatch, sheets, setContext, stack]);

  return sheets.map((item) => {
    return (
      <BottomSheetContainer
        item={item}
        key={item.id}
        options={item.options}
        isPendingClose={pendingCloseQueue.has(item.id)}
        removeBottomSheet={(id) => {
          dispatch({
            type: BottomSheetActionType.Remove,
            id,
          });
        }}
      />
    );
  });
};
