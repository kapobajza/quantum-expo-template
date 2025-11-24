import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useState } from 'react';

import { UseManualRefetchResult } from './types';

const useManualRefetch = <TData, TError>(
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TData, TError>>,
): UseManualRefetchResult => {
  const [isRefetchingManually, setIsRefetchingManually] = useState(false);

  return {
    manualRefetch: async function manualRefetch(params) {
      try {
        setIsRefetchingManually(true);
        await refetch(params);
      } finally {
        setIsRefetchingManually(false);
      }
    },
    isRefetchingManually,
  };
};

export default useManualRefetch;
