export const isEmptyQueryResult = <TData>(data: NoInfer<TData>) => {
  if (typeof data === 'string' && data.length === 0) {
    return true;
  }

  if (data === undefined || data === null) {
    return true;
  }

  if (Array.isArray(data) && data.length === 0) {
    return true;
  }

  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return true;
  }

  return false;
};
