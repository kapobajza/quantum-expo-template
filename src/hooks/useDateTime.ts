import dayjs from 'dayjs';

interface FormatDateParams {
  date: dayjs.ConfigType;
  formatString: string;
}

// eslint-disable-next-line @eslint-react/no-unnecessary-use-prefix
export const useDateTime = () => {
  return {
    formatDate: (params?: Partial<FormatDateParams>) => {
      const { date = new Date(), formatString = 'LL LT' } = params ?? {};
      return dayjs(date).format(formatString);
    },
    formatRelative: ({ date }: { date: dayjs.ConfigType }) => {
      return dayjs(date).fromNow();
    },
    getDate: (date: dayjs.ConfigType) => {
      return dayjs(date);
    },
    getDateWithTz: (date: dayjs.ConfigType) => {
      return dayjs(date).tz(dayjs.tz.guess());
    },
  };
};
