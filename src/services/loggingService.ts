export const createLoggingService = () => {
  return {
    captureException(exception: unknown) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error(exception);
        return;
      }

      // Implement error logging for production
      // For example, you can use a logging service like Sentry or LogRocket
    },
  };
};

export type LoggingService = ReturnType<typeof createLoggingService>;
