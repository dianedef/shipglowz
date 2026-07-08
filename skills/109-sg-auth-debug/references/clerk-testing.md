# Clerk Testing Reference

Use this reference when the agent must test a Clerk-backed auth flow instead of only reading code.

Sources checked:
- https://clerk.com/docs/guides/development/testing/overview
- https://clerk.com/docs/guides/development/testing/playwright/overview
- https://clerk.com/docs/guides/development/testing/playwright/test-helpers
- https://clerk.com/docs/guides/development/testing/test-emails-and-phones
- https://clerk.com/docs/guides/development/managing-environments

Last reviewed: 2026-04-26

## Default Testing Strategy

Prefer this order:

1. `clerk.signIn({ emailAddress })` in Playwright when you need a fast authenticated session.
2. Test OTP flows with Clerk test identifiers when the verification UI itself must be exercised.
3. Browser-only observation for social OAuth, MFA, captcha, device approval, or other human-gated paths.

Do not start by clicking through every auth form manually if a test helper can prove the same thing faster.

## Fastest Reliable Path

For most app-level tests, use `@clerk/testing` with Playwright:

- install `@clerk/testing`
- set `CLERK_PUBLISHABLE_KEY`
- set `CLERK_SECRET_KEY`
- run `clerkSetup()` once for the suite
- use `clerk.signIn({ page, emailAddress })` after `page.goto()` on an unprotected page that loads Clerk

Why this path is preferred:

- it uses Clerk Testing Tokens automatically
- it bypasses bot detection pain
- it avoids manual OTP entry
- it works even if email verification or MFA is otherwise enabled

Important limit:

- `clerk.signIn({ emailAddress })` requires `CLERK_SECRET_KEY`

## Agent Responsibility

When a repo already has Playwright or an E2E test harness, the agent should implement the Clerk testing setup itself instead of only telling the user what to do:

- add `@clerk/testing` to the project test dependencies when it is missing
- wire `clerkSetup()` into the Playwright global setup or suite setup that matches the repo pattern
- call `setupClerkTestingToken({ page })` before visiting Clerk-hosted or Clerk-rendered sign-in/sign-up pages that need visible UI testing
- use `clerk.signIn({ page, emailAddress })` for app-level protected-route tests when the auth UI is not the behavior under test
- update `.env.example`, test docs, or README test instructions with required variable names only, never real secret values
- run the narrowest relevant Playwright test locally when the environment has the needed keys

The agent should ask the user for help only when it cannot produce the required input itself:

- `CLERK_SECRET_KEY`, missing non-production Clerk keys, or dedicated test account credentials are not available in the existing local environment
- a dashboard-only Clerk setting must be enabled or checked
- the flow reaches a real human gate such as MFA, external provider consent, passkey, captcha, or device approval
- production testing would require risky settings such as enabling test mode on a production Clerk instance

When asking, be specific: name the missing variable, explain where it is expected to be set, and state whether the user can provide it via the project's existing secret pattern or should perform a one-off browser step.

## When To Use Test Emails And Phones

Use Clerk test identifiers when you specifically need to validate the code-verification step.

Development instances:

- test email pattern: `user+clerk_test@example.com`
- test phone range: fictional US numbers like `+12015550100`
- fixed verification code: `424242`

Practical rule:

- use test email/phone only for flows that intentionally exercise email-code or phone-code UX
- otherwise prefer `clerk.signIn({ emailAddress })`

Current Clerk limitation:

- `phone_code` and `email_code` helper strategies are development-only

## Testing Tokens

Clerk Testing Tokens are used to bypass bot detection in tests.

- `clerkSetup()` obtains one for the suite
- `setupClerkTestingToken({ page })` injects it for a specific test
- `clerk.signIn()` already uses the token setup internally

The testing token is not a static secret to copy from the Clerk Dashboard during normal Playwright work. Treat it as test runtime plumbing generated through `@clerk/testing`, using `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

Use `setupClerkTestingToken({ page })` before visiting the Clerk sign-in or sign-up page when the test needs to drive the visible auth UI:

```ts
import { clerkSetup, setupClerkTestingToken } from '@clerk/testing/playwright'
import { test } from '@playwright/test'

await clerkSetup()

test('sign up page can be exercised by Playwright', async ({ page }) => {
  await setupClerkTestingToken({ page })
  await page.goto('https://app.example.com/sign-up')
})
```

If tests fail with bot-detection behavior, verify that the suite is actually initializing Clerk testing support instead of just driving the browser raw.

Practical failure sign:

- a bot-protection widget such as Turnstile stays blank or blocks progress before account creation
- Playwright reaches Clerk UI but cannot submit the form even with valid test input

Operational rule:

- for app tests with an existing test account, prefer logging in with test credentials or `clerk.signIn()` instead of creating a new account on every run
- for repeatable automated sign-up creation, add `@clerk/testing` and provide `CLERK_SECRET_KEY`; otherwise assume raw Playwright may hit Clerk bot protection

## What The Agent Should Assume

- A development Clerk instance has test mode enabled by default.
- Enabling test mode on production is possible but discouraged by Clerk.
- Development and production session behavior differ materially.
- A success on `localhost` is not proof that preview or production is correct.

## Environment Warnings

Clerk development and production are not equivalent:

- development uses a different session architecture because the app and Clerk run cross-domain
- development may use shared social credentials
- production has stricter security and domain requirements

Testing policy:

- use a separate non-production Clerk app for staging-like validation
- do not treat development-only success as a production sign-off

## What To Do For OAuth And Social Login

Google, GitHub, and similar flows are different from basic Clerk email/password tests.

Prefer this split:

- use `clerk.signIn()` or test identifiers for app session tests
- use real browser observation for social OAuth wiring, callback URLs, and provider-side errors

Do not promise full automation when the flow includes:

- provider consent
- MFA
- captcha
- device approval
- account chooser behavior outside your app

## Decision Rules

Use `clerk.signIn({ emailAddress })` when:

- you need to test protected pages after login
- the auth UI itself is not the subject under test
- you want the shortest stable path

Use test OTP identifiers when:

- the email-code or phone-code flow itself is under test
- you need to verify form states, code handling, or callback UX

Use browser diagnosis only when:

- the issue is in OAuth redirect behavior
- the issue appears only in preview or production
- the issue depends on cookies, callback domains, middleware, or post-login navigation

## Minimal Playwright Pattern

```ts
import { clerk, clerkSetup } from '@clerk/testing/playwright'
import { test } from '@playwright/test'

test('protected page works for a Clerk user', async ({ page }) => {
  await page.goto('/')
  await clerk.signIn({
    page,
    emailAddress: process.env.E2E_CLERK_USER_EMAIL!,
  })
  await page.goto('/protected')
})
```

## Debug Checklist For The Agent

1. Identify whether the goal is session setup, OTP UX, or real OAuth diagnosis.
2. Prefer `clerk.signIn({ emailAddress })` unless the test explicitly targets verification UI.
3. If using OTP flows, switch to `+clerk_test` email or fictional `+1...555-01xx` phone numbers and use `424242`.
4. If the issue differs by environment, compare development versus preview/production instead of assuming parity.
5. If social OAuth is involved, collect browser evidence and callback URLs rather than forcing full automation.
