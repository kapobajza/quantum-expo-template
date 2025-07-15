import { isAxiosError } from 'axios';

export const createLoggingService = () => {
  return {
    captureException(exception: unknown) {
      if (__DEV__) {
        let data: unknown = undefined;

        if (isAxiosError(exception)) {
          data = exception.response?.data;
        }

        // eslint-disable-next-line no-console
        console.error(exception, data);
        return;
      }

      // Implement error logging for production
      // For example, you can use a logging service like Sentry or LogRocket
    },
  };
};

export type LoggingService = ReturnType<typeof createLoggingService>;
