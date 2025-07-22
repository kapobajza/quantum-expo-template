import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useState } from 'react';

import { UseManualRefetchResult } from './types';

const useManualRefetch = <TData, TError>(
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TData, TError>>,
): UseManualRefetchResult => {
  const [isRefetchingManually, setIsRefetching] = useState(false);

  return {
    manualRefetch: async function manualRefetch(params) {
      try {
        setIsRefetching(true);
        await refetch(params);
      } finally {
        setIsRefetching(false);
      }
    },
    isRefetchingManually,
  };
};

export default useManualRefetch;
