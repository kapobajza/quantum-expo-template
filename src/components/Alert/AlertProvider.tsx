import { useState } from 'react';

import { Alert } from './Alert';
import { AlertContext } from './context';

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<AlertContext>({
    hideAlert() {
      // no-op, will be overridden by Alert
    },
    showAlert() {
      // no-op, will be overridden by Alert
    },
  });

  return (
    <AlertContext value={context}>
      {children}
      <Alert setContext={setContext} />
    </AlertContext>
  );
};
