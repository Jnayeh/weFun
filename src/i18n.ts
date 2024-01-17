import {notFound} from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ["en","ar-tn","ar","fr"];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`~/utils/locales/${locale}.json`)).default
  };
});