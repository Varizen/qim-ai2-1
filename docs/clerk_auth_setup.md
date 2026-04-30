# Clerk Auth Setup

This app is wired for Clerk sign-in/sign-up, site-wide route protection, and a 90-day MFA enforcement policy.

## Required Clerk dashboard settings

1. Open Clerk Dashboard for the production instance.
2. Go to **Configure > User & Authentication > Email, phone, username**.
   - Enable **Phone number**.
   - Enable phone verification with a 6-digit code.
3. Go to **Configure > User & Authentication > Social connections**.
   - Enable **Google**.
   - Enable **Microsoft**.
   - Enable **Apple**.
   - Complete each provider's client ID, client secret, redirect URI, and consent/app verification requirements.
4. Go to **Configure > User & Authentication > Multi-factor authentication**.
   - Enable at least one second factor, preferably authenticator app/TOTP and backup codes.
   - Keep MFA optional in Clerk if the app-level 90-day policy is used.
5. Go to **Configure > Paths**.
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/`
   - After sign-up URL: `/`

## Required environment variables

Set these in local `.env` and in production hosting:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`
- `AUTH_MFA_REQUIRED_AFTER_DAYS=90`
- `AUTH_ENFORCE_MFA_AFTER_GRACE_PERIOD=true`

## App-level MFA policy

Implemented files:

- `middleware.ts` protects every non-public route and redirects users to `/secure-mfa` when a second factor is required.
- `app/secure-mfa/page.tsx` renders Clerk MFA setup UI.
- `lib/auth-policy.ts` reads the Clerk backend user creation date and reports account age/policy status.

The middleware checks Clerk session `factorVerificationAge`. A second-factor age of `-1` means no second factor has been verified for the current session. After the configured grace period, such users are redirected to `/secure-mfa`.

## Important production note

Clerk provider availability cannot be fully enabled from this repository alone. Google, Microsoft, Apple, phone verification, and MFA methods must be activated in the Clerk Dashboard because they require provider credentials and verified redirect settings.
