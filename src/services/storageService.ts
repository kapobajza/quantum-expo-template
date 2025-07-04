import * as SecureStore from 'expo-secure-store';

export interface SecureStorageParamMap {
  AuthToken: {
    token: string;
  };
}

export const createStorageService = () => {
  return {
    setSecureItem: <TKey extends keyof SecureStorageParamMap>(
      key: TKey,
      value: SecureStorageParamMap[TKey],
    ) => {
      let stringified: string;

      if (typeof value !== 'string') {
        stringified = JSON.stringify(value);
      } else {
        stringified = value;
      }

      return SecureStore.setItemAsync(key, stringified);
    },
    getSecureItem: async <TKey extends keyof SecureStorageParamMap>(
      key: TKey,
    ): Promise<SecureStorageParamMap[TKey] | null> => {
      const item = await SecureStore.getItemAsync(key);

      if (!item) {
        return null;
      }

      return JSON.parse(item) as SecureStorageParamMap[TKey];
    },
    deleteSecureItem: async (key: keyof SecureStorageParamMap) => {
      await SecureStore.deleteItemAsync(key);
    },
  };
};

export type StorageService = ReturnType<typeof createStorageService>;
