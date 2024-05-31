import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { LOCALES } from "./i18n";

export const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: LOCALES,
  localePrefix: "as-needed",

  // Used when no locale matches
  defaultLocale: "en",
});

// const isPublicRoute = createRouteMatcher([
//   "/:locale/sign-in(.*)",
//   "/:locale/sign-up(.*)",
// ]);
const isPublicRoute = createRouteMatcher([
  "/:locale/sign-in",
  "/sign-in",
  "/:locale/sign-up",
  "/sign-up",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  return intlMiddleware(request);
});

export const config = {
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
