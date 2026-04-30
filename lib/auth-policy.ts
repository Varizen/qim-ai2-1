import { auth, clerkClient } from "@clerk/nextjs/server";

const DEFAULT_MFA_REQUIRED_AFTER_DAYS = 90;
const DAY_MS = 24 * 60 * 60 * 1000;

export function getMfaRequiredAfterDays() {
  const value = Number(process.env.AUTH_MFA_REQUIRED_AFTER_DAYS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_MFA_REQUIRED_AFTER_DAYS;
}

export function isMfaGracePeriodEnforced() {
  return process.env.AUTH_ENFORCE_MFA_AFTER_GRACE_PERIOD !== "false";
}

export async function getMfaPolicyStatus() {
  const authObject = await auth();

  if (!authObject.isAuthenticated) {
    return {
      isAuthenticated: false,
      isMfaRequired: false,
      accountAgeDays: 0,
      requiredAfterDays: getMfaRequiredAfterDays(),
    };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(authObject.userId);
  const accountAgeDays = Math.floor((Date.now() - user.createdAt) / DAY_MS);
  const [, secondFactorAge] = authObject.factorVerificationAge ?? [null, null];
  const requiredAfterDays = getMfaRequiredAfterDays();

  return {
    isAuthenticated: true,
    isMfaRequired: isMfaGracePeriodEnforced() && accountAgeDays >= requiredAfterDays && secondFactorAge === -1,
    accountAgeDays,
    requiredAfterDays,
  };
}