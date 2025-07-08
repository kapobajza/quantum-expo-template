import { ComponentType } from 'react';
import { PressableProps } from 'react-native';

export type AlertType = 'prompt' | 'info';

export type HideAlertFn = () => void;

export interface ModalStackParams {
  ChangeLanguage: undefined;
  Alert: {
    message: string;
    title: string;
    type?: AlertType;
    onConfirm?: (hide: HideAlertFn) => void;
    onCancel?: (hide: HideAlertFn) => void;
  };
}

export interface ModalComponentProps<
  TName extends keyof ModalStackParams = never,
  TParams extends ModalStackParams = ModalStackParams,
> {
  params: TParams[TName];
  closeModal(): void;
}

export type ModalComponent = ComponentType<ModalComponentProps>;

export type ModalStack = {
  [TName in keyof ModalStackParams]: ModalComponent;
};

export type ModalName = keyof ModalStack;

interface ModalOptions {
  backdropProps?: Omit<PressableProps, 'onPress'>;
}

export type ShowModalFn = <
  TModalName extends keyof ModalStackParams,
  TArgs extends ModalStackParams[TModalName],
>(
  ...args: TArgs extends undefined
    ? [name: TModalName, { options?: ModalOptions }?]
    : [name: TModalName, { args: TArgs; options?: ModalOptions }?]
) => void;

export interface ModalItem<TModalName extends ModalName = ModalName> {
  name: ModalName;
  Component: ModalComponent;
  params?: ModalStackParams[TModalName];
  options?: ModalOptions;
  id: string;
}

export interface ModalState {
  modals: ModalItem[];
  pendingCloseQueue: Set<string>;
}

export const ModalActionType = {
  Show: 'show_modal',
  Remove: 'remove_modal',
  Dismiss: 'dismiss_modal',
  DismisAll: 'dismiss_all_modals',
} as const;

export type ModalAction =
  | {
      type: typeof ModalActionType.Show;
      modal: Omit<ModalItem, 'id'>;
    }
  | {
      type: typeof ModalActionType.Remove;
      id: string;
    }
  | {
      type: typeof ModalActionType.Dismiss;
      name?: ModalName;
    }
  | {
      type: typeof ModalActionType.DismisAll;
    };
