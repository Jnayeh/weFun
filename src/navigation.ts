import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ["ar-tn","ar","en","fr"] as const;
export const localePrefix = 'always'; // Default
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});