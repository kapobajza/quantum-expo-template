export type AlertType = 'prompt' | 'info';

export type HideAlertFn = () => void;

export interface AlertItem {
  message: string;
  title: string;
  type?: AlertType;
  onConfirm?: (hide: HideAlertFn) => void;
  onCancel?: (hide: HideAlertFn) => void;
}
