import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && req.nextUrl.pathname.toLocaleLowerCase().match(/(protected|categories\b)/gi)) {
          return redirectToSignIn({ returnBackUrl: req.url });
        }
      }
    });
 
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};
 