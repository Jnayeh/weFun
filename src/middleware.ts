import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './navigation';
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
/* export default authMiddleware({
    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && req.nextUrl.pathname.toLocaleLowerCase().match(/(protected)/gi)) {
          return redirectToSignIn({ returnBackUrl: req.url });
        }
      }
    }); 
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};*/
 

export default createMiddleware({
  defaultLocale: 'ar-tn',
  locales,
  localePrefix
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ar-tn|ar|en|fr)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};