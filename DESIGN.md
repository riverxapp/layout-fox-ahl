# Design Intent

- Product type: Bubble development agency website with future-ready authenticated product surfaces.
- Primary outcome: convert high-intent founders and product teams into discovery calls.
- Brand posture: sharp, confident, pragmatic, editorial on marketing pages; calm and operational in app/dashboard pages.
- Emotional target:
  - Marketing: momentum, trust, speed-to-value.
  - Auth: clarity, safety, low-friction entry.
  - Dashboard: control, focus, decision readiness.
- Anti-patterns:
  - Generic blue/purple SaaS gradients.
  - Oversized decorative UI that hides CTAs.
  - Ambiguous navigation or equal-weight competing actions.

# Information Architecture & Route Matrix

| Route | Purpose | Audience | Primary Action | Guard | Notes |
|---|---|---|---|---|---|
| `/` | Agency marketing landing | Founder, ops lead, product manager | Book discovery call | Public | Full-width story sections + proof + pricing + contact |
| `/login` | Existing client sign in | Returning users | Sign in | Public (redirect if authed) | Email/password + SSO option slot |
| `/signup` | New account creation | New users | Create account | Public (redirect if authed) | Keep form short, defer profile fields |
| `/forgot-password` | Password recovery | Locked-out users | Send reset link | Public | Single input flow with success confirmation |
| `/reset-password` | Reset via token | Recovering users | Set new password | Public token-gated | Error handling for expired/invalid token |
| `/dashboard` | Client workspace | Authenticated users | Complete priority task | Auth-only | KPI + activity + tasks + quick actions |
| `*` | Unknown route | Any | Go home / go dashboard | Public | Distinguish 404 vs permission denied vs offline |

- Navigation relationships:
  - Global marketing nav on `/`.
  - Minimal auth nav on auth routes.
  - App shell nav (top bar + optional sidebar) on `/dashboard`.
- Redirect rules:
  - Unauthenticated access to `/dashboard` -> `/login?next=/dashboard`.
  - Authenticated access to `/login` or `/signup` -> `/dashboard`.

# Layout Framework

- Primary content container: `max-w-[1440px]`.
- Horizontal paddings: `px-4 sm:px-6 lg:px-8`.
- Section cadence:
  - Standard spacing: `space-y-9 sm:space-y-12`.
  - Hero and pricing can use larger vertical breathing space (`py-12` to `py-16`).
- Grid principles:
  - Marketing hero: `lg:grid-cols-[1.1fr,0.9fr]`.
  - Service cards: `md:grid-cols-2 lg:grid-cols-3`.
  - Case studies: `md:grid-cols-2`.
  - Pricing: `lg:grid-cols-3`.
- Full-width band rules:
  - Use full-bleed wrappers for social proof, case outcomes, process, pricing, testimonial, final CTA.
  - Keep inner content aligned with the same `max-w-[1440px]` container.
- Post-login shell zones:
  - Top bar (global actions, account, notifications).
  - Optional sidebar (primary modules, collapsible).
  - Content header (title, breadcrumbs, primary CTA).
  - Main workspace region (widgets/tables/panels).

# Color System

- Base tokens:
  - `canvas`: `#fffaf2`
  - `surface`: `#fff2e2`
  - `surface-strong`: `#ffe7cf`
  - `surface-muted`: `#f9efe3`
  - `ink`: `#26170e`
  - `ink-soft`: `#6f5b4a`
  - `ink-inverse`: `#f7ebe0`
  - `accent`: `#ff6b4a`
  - `accent-soft`: `#ff9d7a`
  - `accent-deep`: `#d94828`
  - `border-warm`: `#f1ddc9`
  - `border-dark`: `#3a2a22`
- Semantic mapping:
  - `background`: `canvas`
  - `card`: `surface`
  - `card-muted`: `surface-muted`
  - `primary`: `accent`
  - `primary-hover`: `accent-deep`
  - `secondary`: `surface-strong`
  - `text-primary`: `ink`
  - `text-secondary`: `ink-soft`
  - `text-inverse`: `ink-inverse`
  - `success`: `#1f9d63`
  - `warn`: `#d37a00`
  - `error`: `#d63838`
  - `info`: `#2a7dbf`
- Contrast constraints:
  - Primary button text must be white on `accent` or `accent-deep` only.
  - Body text must never use `accent-soft` on light backgrounds.
  - Inverse backgrounds require `ink-inverse` or white text only.

# Typography System

- Font direction:
  - Marketing headlines: editorial serif stack (or high-contrast display fallback).
  - UI/body/dashboard: stable sans stack for legibility.
- Type scale:
  - Hero H1: `text-4xl sm:text-6xl`, `font-bold`, `leading-[0.98]`, tight tracking.
  - Section H2: `text-3xl`, `font-bold`, `leading-tight`.
  - Card title: `text-lg` to `text-xl`, semibold.
  - Body: `text-sm` to `text-base`, `leading-relaxed`.
  - Meta/labels/kickers: `text-xs`, uppercase, tracking `0.14em` to `0.16em`.
  - Dashboard KPIs: `text-2xl` to `text-4xl`, bold.
  - Table text: `text-sm`, headers semibold.

# Elevation and Shadows

- Shadow scale:
  - `shadow-1`: `0 1px 2px rgba(38,23,14,0.06)`
  - `shadow-2`: `0 6px 16px -10px rgba(38,23,14,0.20)`
  - `shadow-3`: `0 14px 36px -22px rgba(217,72,40,0.45)`
  - `shadow-4`: `0 24px 70px -34px rgba(217,72,40,0.55)`
  - `shadow-5`: `0 30px 90px -30px rgba(217,72,40,0.68)`
- Usage matrix:
  - Nav/header: `shadow-1` on sticky overlap.
  - Standard cards: `shadow-1` rest, `shadow-3` hover.
  - Hero highlight panel: `shadow-4` rest.
  - Featured pricing card: `shadow-5` rest/hover.
  - Modals/sheets: `shadow-4`.
  - Toast/dropdown: `shadow-2`.
- State behavior:
  - Rest -> hover: increase one tier.
  - Active/pressed: decrease one tier from hover.

# Borders, Radius, and Surfaces

- Border rules:
  - Default border: `1px solid border-warm`.
  - Dark sections: `1px solid border-dark`.
  - Inputs: warm border at rest, accent-tinted ring on focus.
- Radius scale:
  - Inputs/buttons: `rounded-md`.
  - Cards/panels: `rounded-xl`.
  - Hero/pricing emphasis blocks: `rounded-2xl`.
- Surface layers:
  - Layer 0: `canvas`.
  - Layer 1: `surface`.
  - Layer 2: `surface-strong`.
  - Inverse layer: dark chocolate section for pricing and contrast breaks.

# Interaction Model (Required)

- Transition defaults:
  - Buttons/links: `transition-colors duration-200`.
  - Cards: `transition-all duration-200`.
  - Panels: `transition-all duration-250`.
- Button behavior:
  - Primary: accent fill, deepen on hover.
  - Secondary: warm outline/surface, stronger contrast on hover.
  - Disabled: `opacity-50`, no hover transform.
- Card behavior:
  - Rest: `translate-y-0`.
  - Hover: `-translate-y-1` + `shadow-3`.
  - Active: back to `translate-y-0` + `shadow-2`.
- Navigation:
  - Active item gets highest contrast background/text treatment.
  - Hover states must preserve readable contrast.
- Focus-visible:
  - `focus-visible:outline-none` + `focus-visible:ring-2` + warm/accent ring.
- Table rows/widgets:
  - Row hover uses subtle warm tint, not dramatic movement.

# Animation System (Required)

- Principles:
  - Motion clarifies hierarchy and state changes only.
  - No looping decorative animations that distract from conversion.
- Presets:
  - `page-intro`: fade + slight upward motion, `400ms`, `ease-out`.
  - `section-reveal`: fade + y-8 to y-0, `420ms`, `ease-out`.
  - `card-stagger`: `120ms` stagger increments, max `480ms` delay.
  - `hover-lift`: `200ms`, `cubic-bezier(0.22,1,0.36,1)`.
  - `cta-glow`: subtle shadow pulse every `2.8s`, paused on reduced motion.
  - `modal-enter`: scale 0.98 -> 1 + fade, `220ms`.
  - `modal-exit`: fade + y-2, `180ms`.
  - `toast-enter/exit`: slide-x + fade, `180ms`.
- Reduced motion:
  - Respect `prefers-reduced-motion`; disable non-essential movement and pulse.

# Authentication Experience

- Pages: Sign in, Sign up, Forgot Password, Reset Password.
- Layout spec:
  - Centered auth card (`max-w-md`) + optional trust/support side panel on desktop.
  - Keep one primary action per page.
- Form behavior:
  - Validate on blur + submit.
  - Inline errors below field with concise fix instruction.
  - Keep submit button width full and lock on submitting.
- Required states:
  - Idle, focus, invalid, submitting, success, failure, locked account.
- Guard behavior:
  - Authed users never stay on login/signup.
  - Session timeout shows re-auth prompt with resume path.
- A11y:
  - Logical tab order, visible focus, `aria-live` region for form-level errors.

# Dashboard System

- Layout blueprint:
  - Top bar (search, notifications, profile).
  - Optional collapsible sidebar.
  - Content header with page title + primary action.
- First-screen modules:
  - KPI summary row.
  - Recent activity feed.
  - Tasks/alerts block.
  - Quick actions (create request, upload brief, book call).
- Data-dense UI patterns:
  - Table with sorting, filters, pagination, bulk select.
  - Side detail panel for row context.
  - Empty states with guided CTA.
- Permission model UX:
  - Admin/member/viewer visibility differences.
  - Permission-denied surfaces with explain + request-access action.
- Responsive rules:
  - 375: single-column stack, hidden secondary columns.
  - 768: two-column widget matrix.
  - 1024+: full density with sidebar support.
  - 1440: comfortable spacing, no stretched line lengths.

# Application Shell (Post-login)

- Shell behavior:
  - Sticky top bar.
  - Sidebar collapses to icon rail on narrower desktop.
  - Breadcrumbs shown on deep routes.
- Action bar conventions:
  - Left: page context.
  - Right: primary CTA + optional secondary actions.
- Global affordances:
  - Notification bell with unread badge.
  - Account menu with session controls.
  - Global search slot in top bar.

# State Design

- Loading:
  - Skeletons for cards, tables, and forms.
- Empty:
  - Explain missing data + one next best action.
- Error:
  - Contextual message + retry action.
- Success:
  - Inline confirmation + optional follow-up CTA.
- Offline:
  - Persistent banner with reconnect notice.
- Permission denied:
  - Explicit reason + request access path.

# Form UX Standards

- Validation:
  - Client-side for format, server-side for business rules.
  - Prevent ambiguous errors; always provide fixable message.
- Submit lifecycle:
  - Idle -> validating -> submitting -> success/error.
  - Disable repeated submissions until response returns.
- Recovery:
  - Preserve entered data when reasonable.
  - Session expiry returns user to prior intent after re-auth.

# Security & Trust UX

- Session expiry:
  - Warn before timeout on dashboard.
  - Re-auth modal should preserve unsaved progress intent where possible.
- Device/session messaging:
  - Show last sign-in metadata in account area.
- Sensitive actions:
  - Use explicit confirmation for destructive operations.

# Observability Hooks

- Event naming:
  - `marketing_*`, `auth_*`, `dashboard_*` prefixes.
- Core tracked actions:
  - Marketing CTA clicks, pricing interactions, case study opens.
  - Auth starts/submits/success/failure/lockouts.
  - Dashboard primary action clicks, filter/sort usage, empty-state recovery actions.
- Payload guidance:
  - Include route, component id, role (if authed), and timestamp.

# Component Recipes

- Marketing recipes:
  - Hero, Social Proof Strip, Services Grid, Case Studies, Process Timeline, Pricing, Testimonial, Final CTA.
- Auth recipes:
  - Auth card, trust side panel, inline error banner, password recovery prompt.
- Dashboard recipes:
  - KPI row, activity feed, task panel, data table, empty state panel.
- Structural rule:
  - Use `kicker -> statement -> proof -> action` where applicable.
- Behavior:
  - Every recipe must define default, hover, focus, and responsive behavior.

# Responsive Rules

- Breakpoints:
  - 375, 768, 1024, 1440.
- Layout behavior:
  - Collapse multi-column marketing sections to single column on mobile.
  - Convert dense dashboard tables to horizontal scroll or condensed rows on mobile.
- Typography:
  - Step down headline sizes below 768 while preserving hierarchy.

# Content and Microcopy Rules

- Voice split:
  - Marketing: decisive, outcome-forward.
  - Auth: clear and reassuring.
  - Dashboard: concise, task-oriented.
- CTA patterns:
  - Use action verbs: `Book`, `Start`, `Review`, `Continue`, `Request`.
- Proof formatting:
  - Quantify outcomes when possible (`+42%`, `$420K`, `21 days`).
- Error copy:
  - Human-readable, non-blaming, includes next action.
- Length guidance:
  - Hero supporting copy max ~2 lines desktop, ~3 lines mobile.

# Implementation Handoff for AI Agent

- Prefer token-driven Tailwind classes and semantic usage over random ad-hoc values.
- Keep full-width backgrounds implemented with outer full-bleed wrappers and inner `max-w-[1440px]` containers.
- Reuse existing component APIs; style through className and layout composition.
- Implement route structure progressively:
  - `/` first (marketing conversion flow)
  - auth routes second
  - `/dashboard` shell and modules third
- Ensure no open design decisions remain before coding each route.

# QA Acceptance Checklist

- Visual:
  - Color, typography, radius, border, and shadow systems are consistent.
- Interaction:
  - Hover/focus/active/disabled states are implemented for interactive controls.
- Animation:
  - Motion presets applied consistently and not overused.
- Accessibility:
  - Focus-visible states present; keyboard flow works; contrast passes.
- Performance:
  - Avoid heavy effects that hurt rendering or interactivity.
- Reduced motion:
  - Non-essential animations disabled under reduced-motion preference.

# Definition of Done for `design.md` Generation (Strict Contract)

- All required sections above are present.
- Exact token values and transition timings are specified.
- Auth + dashboard acceptance criteria are included.
- Implementation guidance is decision-complete for an AI coding agent.
