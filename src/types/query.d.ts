import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      /**
       * Wheter to hide the error toast when an error occurs in this query.
       *
       * By default, errors will show a toast notification.
       */
      hideToastError?: boolean;
    };
  }
}
