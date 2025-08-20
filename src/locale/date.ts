/* eslint-disable import-x/no-named-as-default-member */
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en-gb';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import preParsePostFormat from 'dayjs/plugin/preParsePostFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const setupDateTimeLocale = () => {
  dayjs.extend(preParsePostFormat);
  dayjs.extend(localizedFormat);
  dayjs.extend(localeData);
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
};
