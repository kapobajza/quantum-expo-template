export interface InfiniteQueryResponse<TQueryFnData, TExtraData> {
  results: TQueryFnData[];
  extraData: TExtraData | undefined;
}
