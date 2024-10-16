import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from "@/i18n/i18n-action";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    messages: (await import(`@/i18n/messages/${locale}.json`)).default
  };
});