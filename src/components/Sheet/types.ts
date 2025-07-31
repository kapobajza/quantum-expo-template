import { ComponentType } from 'react';
import { ViewProps } from 'react-native';

export interface ActionSheetStackParams {
  Language: undefined;
}

export type ActionSheetSnapPoint = number | `${string}%` | 'auto';

export interface ActionSheetOptions {
  snapPoints?: ActionSheetSnapPoint[];
  closeOnOverlayPress?: boolean;
}

export type ActionSheetComponent = ComponentType<Pick<ViewProps, 'onLayout'>>;

export type ActionSheetStack = {
  [TName in keyof ActionSheetStackParams]: ActionSheetComponent;
};

export type ActionSheetName = keyof ActionSheetStack;

export interface ActionSheetItem<
  TActionSheetName extends ActionSheetName = ActionSheetName,
> {
  name: ActionSheetName;
  Component: ActionSheetComponent;
  params?: ActionSheetStackParams[TActionSheetName];
  options?: ActionSheetOptions;
  id: string;
  height?: number;
}

export interface ActionSheetState {
  sheets: ActionSheetItem[];
  pendingCloseQueue: Set<string>;
}

export const SheetActionType = {
  Show: 'show_sheet',
  Remove: 'remove_sheet',
  Dismiss: 'dismiss_sheet',
  DismisAll: 'dismiss_all_sheets',
  Update: 'update_sheet',
} as const;

export type SheetAction =
  | {
      type: typeof SheetActionType.Show;
      sheet: Omit<ActionSheetItem, 'id'>;
    }
  | {
      type: typeof SheetActionType.Remove;
      id: string;
    }
  | {
      type: typeof SheetActionType.Dismiss;
      name?: ActionSheetName;
    }
  | {
      type: typeof SheetActionType.DismisAll;
    }
  | {
      type: typeof SheetActionType.Update;
      sheet: Partial<Omit<ActionSheetItem, 'id'>> & Pick<ActionSheetItem, 'id'>;
    };

export type ShowActionSheetFn = <
  TActionSheetName extends keyof ActionSheetStackParams,
  TArgs extends ActionSheetStackParams[TActionSheetName],
>(
  ...args: TArgs extends undefined
    ? [name: TActionSheetName, { options?: ActionSheetOptions }?]
    : [name: TActionSheetName, { args: TArgs; options?: ActionSheetOptions }?]
) => void;
