import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health",
  "/api/webhook",
]);

const isMfaSetupRoute = createRouteMatcher(["/secure-mfa(.*)"]);

const MFA_SETUP_PATH = "/secure-mfa";
const DEFAULT_MFA_REQUIRED_AFTER_DAYS = 90;

function getMfaRequiredAfterDays() {
  const value = Number(process.env.AUTH_MFA_REQUIRED_AFTER_DAYS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_MFA_REQUIRED_AFTER_DAYS;
}

function getClaimNumber(claims: Record<string, unknown> | null | undefined, key: string) {
  const value = claims?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

type MfaAuthObject = {
  isAuthenticated: boolean;
  sessionClaims: Record<string, unknown> | null;
  factorVerificationAge: [number, number] | null;
};

function shouldRequireSecondFactor(authObject: MfaAuthObject) {
  if (!authObject.isAuthenticated) return false;
  if (process.env.AUTH_ENFORCE_MFA_AFTER_GRACE_PERIOD === "false") return false;

  const claims = authObject.sessionClaims as Record<string, unknown> | null;
  const issuedAtSeconds = getClaimNumber(claims, "iat");
  const sessionAgeDays = issuedAtSeconds ? (Date.now() / 1000 - issuedAtSeconds) / 86400 : 0;
  const userCreatedAtSeconds = getClaimNumber(claims, "user_created_at");
  const accountAgeDays = userCreatedAtSeconds ? (Date.now() / 1000 - userCreatedAtSeconds) / 86400 : sessionAgeDays;
  const [, secondFactorAge] = authObject.factorVerificationAge ?? [null, null];

  return accountAgeDays >= getMfaRequiredAfterDays() && secondFactorAge === -1;
}

// Check if Clerk keys are configured
const clerkConfigured =
  !!process.env.CLERK_SECRET_KEY &&
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// If Clerk is not configured, use a no-op passthrough middleware
// This prevents MIDDLEWARE_INVOCATION_FAILED when env vars are missing
export default clerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      const authObject = await auth();

      if (!isPublicRoute(req)) {
        await auth.protect();
      }

      if (!isPublicRoute(req) && !isMfaSetupRoute(req) && shouldRequireSecondFactor(authObject)) {
        return Response.redirect(new URL(MFA_SETUP_PATH, req.url));
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
