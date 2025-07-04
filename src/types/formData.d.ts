declare global {
  interface FormDataFile {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: string | Blob | FormDataFile): void;
    append(name: string, value: Blob, fileName?: string): void;
  }
}

export {};
