import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/lib/routes";

/*
    The middleware runs on every request, ie in our case always checking for isLoggedIn
    We are declaring different route types via routes.ts, ie public, auth

    You can only have ONE middlware.ts, but you can still modularize

    https://authjs.dev/getting-started/migrating-to-v5 

    Edge compatibility - 
    So for example, if you are using an adapter that relies on an 
    ORM/library that is not yet compatible with Edge runtime(s) below 
    is an example where we force the jwt strategy and split up the 
    configuration so the library doesn’t attempt to access the 
    database in edge environments, like in the middleware.
*/

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (process.env.NODE_ENV === "development") {
    console.log("isLoggedIn", isLoggedIn);
    console.log("Route: ", nextUrl.pathname);
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const publicRoute = publicRoutes.includes(nextUrl.pathname);
  const authRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (authRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !publicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
