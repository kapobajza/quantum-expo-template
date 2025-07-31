import React, { useEffect } from 'react';

import { ActionSheetContext } from './context';
import { ActionSheet } from './Sheet';
import { useActionSheetStore } from './store';
import { ActionSheetStack, SheetActionType } from './types';

interface ActionSheetListProps {
  setContext: (context: ActionSheetContext) => void;
  stack: ActionSheetStack;
}

export const ActionSheetList = ({
  setContext,
  stack,
}: ActionSheetListProps) => {
  const { sheets, dispatch, pendingCloseQueue } = useActionSheetStore();

  useEffect(() => {
    setContext({
      hideActionSheet: (name) => {
        dispatch({
          type: SheetActionType.Dismiss,
          name,
        });
      },
      showActionSheet: (...args) => {
        const [name, opts] = args;
        const {
          // @ts-expect-error - args do exist
          args: params,
          options,
        } = opts ?? {};

        dispatch({
          type: SheetActionType.Show,
          sheet: {
            name,
            Component: stack[name],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            params,
            options,
          },
        });
      },
      closeAllActionSheets() {
        dispatch({
          type: SheetActionType.DismisAll,
        });
      },
    });
  }, [dispatch, sheets, setContext, stack]);

  return sheets.map((item) => {
    return (
      <ActionSheet
        item={item}
        key={item.name}
        isPendingClose={pendingCloseQueue.has(item.id)}
        removeActionSheet={(sheetId) => {
          dispatch({
            type: SheetActionType.Remove,
            id: sheetId,
          });
        }}
      />
    );
  });
};
