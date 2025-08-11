import { BottomSheetProps } from '@gorhom/bottom-sheet';
import { ComponentType } from 'react';

export interface BottomSheetStackParams {
  ChangeLanguage: undefined;
}

export interface BottomSheetComponentProps<
  TName extends BottomSheetName = BottomSheetName,
> {
  params: BottomSheetStackParams[TName];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BottomSheetComponent = ComponentType<any>;

export type BottomSheetStack = {
  [TName in keyof BottomSheetStackParams]: BottomSheetComponent;
};

export type BottomSheetName = keyof BottomSheetStack;

export interface BottomSheetOptions {
  snapPoints?: BottomSheetProps['snapPoints'];
}

export interface BottomSheetArguments<TArgs = unknown> {
  options?: BottomSheetOptions;
  payload?: TArgs;
}

export type ShowBottomSheetFn = <
  TBottomSheetName extends keyof BottomSheetStackParams,
  TArgs extends BottomSheetStackParams[TBottomSheetName],
>(
  ...args: TArgs extends undefined
    ? [name: TBottomSheetName, Omit<BottomSheetArguments, 'payload'>?]
    : [name: TBottomSheetName, BottomSheetArguments<TArgs>]
) => void;

export interface BottomSheetItem<
  TBottomSheetName extends BottomSheetName = BottomSheetName,
> {
  name: BottomSheetName;
  Component: BottomSheetComponent;
  params?: BottomSheetStackParams[TBottomSheetName];
  options?: BottomSheetOptions;
  id: string;
}

export interface BottomSheetState {
  sheets: BottomSheetItem[];
  params: unknown;
  pendingCloseQueue: Set<string>;
  options: BottomSheetOptions | undefined;
}

export const BottomSheetActionType = {
  Show: 'show_bottom_sheet',
  Remove: 'remove_bottom_sheet',
  Dismiss: 'dismiss_bottom_sheet',
  DismisAll: 'dismiss_all_bottom_sheets',
} as const;

export type BottomSheetAction =
  | {
      type: typeof BottomSheetActionType.Show;
      item: Omit<BottomSheetItem, 'id'>;
    }
  | {
      type: typeof BottomSheetActionType.Remove;
      id: string;
    }
  | {
      type: typeof BottomSheetActionType.Dismiss;
      name?: BottomSheetName;
    }
  | {
      type: typeof BottomSheetActionType.DismisAll;
    };
