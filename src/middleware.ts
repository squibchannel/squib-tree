import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/lib/routes";

const { auth: middleware } = NextAuth(authConfig);

// Combine existing middleware with new middleware
export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Log information in development mode
  if (process.env.NODE_ENV === "development") {
    console.log("isLoggedIn", isLoggedIn);
    console.log("Route: ", nextUrl.pathname);
  }

  // Check if the route is an API auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Check if the route is a public route or an authenticated route
  const publicRoute = publicRoutes.includes(nextUrl.pathname);
  const authRoute = authRoutes.includes(nextUrl.pathname);

  if (nextUrl.pathname === "/api/twitchbot" && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Redirect users based on authentication status and route type
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
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
