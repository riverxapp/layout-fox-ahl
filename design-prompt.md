# design.md
> Production design specification for an AI coding agent implementing marketing, authentication, and dashboard surfaces in React + Tailwind + shadcn-style components.

---

## 1. Design Intent

### Brand Personality
Bold, editorial, founder-facing. The product is confident without being corporate. It communicates craft, speed, and results — not software features. Think: a great studio's portfolio crossed with a modern SaaS tool. Intentional restraint on marketing surfaces; high information density on authenticated surfaces.

### Visual Tone
- **Marketing**: Editorial magazine. Radical typographic scale contrast. Generous breathing room. Warm neutral base palette punctuated by a single vivid accent. Never sterile, never over-polished.
- **Auth**: Calm, focused, frictionless. One task per screen. Trust signals present but not anxious.
- **Dashboard**: Data-first. Clean density. No decorative chrome. Every pixel earns its place.

### User Perception Goals
- First impression: "This was made by someone who cares about craft."
- On scroll: "This product clearly understands my problem."
- On login: "I feel in control and secure."
- On dashboard: "I can find what I need immediately."

### Anti-Patterns to Avoid
- Purple/blue gradient hero backgrounds
- Centered headline + paragraph + two buttons as default hero layout
- Card grids that all use the same shell (same padding, same radius, same shadow)
- Stock photography of laptops and handshakes
- All-white sections stacked end to end with no rhythm change
- Accent color used on more than 3 visible elements above the fold
- System fonts (Inter, Roboto, Arial, SF Pro as brand font)
- Flat sterile dashboard with no visual hierarchy between panels

---

## 2. Information Architecture & Route Matrix

| Route | Intent | Primary Audience | Primary CTA | Guard |
|---|---|---|---|---|
| `/` | Convert visitors to signups | Cold prospects | "Start your project" | Public |
| `/login` | Authenticate returning users | Existing users | "Sign in" | Redirect if authed → `/dashboard` |
| `/signup` | Capture new accounts | Warm prospects | "Create account" | Redirect if authed → `/dashboard` |
| `/forgot-password` | Initiate password reset | Locked-out users | "Send reset link" | Public |
| `/reset-password` | Set new password | Email link clickers | "Set new password" | Token-gated |
| `/dashboard` | Primary app surface | Authenticated users | Varies by context | Auth-only |
| `404` | Graceful dead-end recovery | Any | "Go home" | Public |
| `403` | Permission denied | Authed, wrong role | "Request access" | Auth-only |
| `offline` | No connectivity | Any | "Retry" | Public |

### Route Guard Behavior
- **Public routes** (`/`, `/login`, `/signup`, `/forgot-password`): accessible to all. Authenticated users visiting `/login` or `/signup` redirect immediately to `/dashboard`.
- **Auth-only routes** (`/dashboard`, `/reset-password` after token validation): unauthenticated users redirect to `/login?redirect=[original_path]`. Post-login, redirect to stored path or `/dashboard`.
- **Token-gated** (`/reset-password`): validate token server-side on load. Expired or invalid token renders inline error, not a redirect.
- **Session timeout**: soft expiry shows a modal overlay ("Your session has expired — sign in again") without navigating away. Hard expiry redirects to `/login?reason=session_expired`.

---

## 3. Layout Framework

### Main Container
```
max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16
```

### Full-Width Band Sections
Some sections require a full-width background color/image with inner constrained content:
```html
<section class="w-full bg-[--color-band-dark]">
  <div class="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
    <!-- content -->
  </div>
</section>
```
**Allowed full-width bands**: Pricing (dark inverse), final CTA (accent), process/timeline (mid-tone), testimonial carousel (dark or off-white).

### Section Cadence Map (Marketing Homepage, in order)
Every section must use the assigned background. Deviation requires explicit justification.

| # | Section | Background Token | Text Color |
|---|---|---|---|
| 1 | Nav | Transparent → `surface-0` on scroll | Primary |
| 2 | Hero | `surface-0` (cream/off-white `#F5F3EE`) | Primary |
| 3 | Social Proof Strip | `surface-0` | Muted |
| 4 | Services / Features | `#FFFFFF` | Primary |
| 5 | Case Studies | `#FFFFFF` | Primary |
| 6 | Process / Timeline | `surface-1` (`#F0EDE6`) | Primary |
| 7 | Pricing | `inverse-bg` (`#1A1916`) | Inverse |
| 8 | Testimonial | `#FFFFFF` | Primary |
| 9 | Final CTA | `accent` (`#E8572A`) | White |
| 10 | Footer | `#111110` | Inverse muted |

### Breathing Room Doctrine
Marketing sections are separated by `clamp(80px, 12vw, 160px)` vertical space — not 64px. This is intentional. Whitespace communicates confidence. Do not reduce it for density. Apply via a shared section wrapper class:
```css
.section-gap { padding-block: clamp(80px, 12vw, 160px); }
```

### Grid System
- **Default content grid**: 12 columns, `gap-6 md:gap-8`
- **Card grids**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap-5 md:gap-6`
- **2-up feature rows**: `grid-cols-1 md:grid-cols-2`, `gap-12 lg:gap-20`
- **Dashboard panels**: 12 columns, `gap-4`

### Header/Footer Rules
- **Nav height**: 56px fixed. Transparent on hero, `surface-0 + border-b` after 80px scroll.
- **Footer**: Dark inverse, 4-column grid on desktop, stacked on mobile. Always full-width band.

### Post-Login Shell Layout Zones
```
┌─────────────────────────────────────────────┐
│ Top Bar (56px) — logo, search, notif, avatar│
├──────────┬──────────────────────────────────┤
│ Sidebar  │ Content Header (breadcrumb + CTA) │
│ (240px,  ├──────────────────────────────────┤
│ collapse │ Primary Content Area              │
│ to 60px) │                                   │
│          │                                   │
└──────────┴──────────────────────────────────┘
```
- **Top bar**: `h-14`, `border-b border-border`, `bg-surface-0`, `z-50 sticky top-0`
- **Sidebar**: `w-60` desktop, `w-15` collapsed (icon-only), hidden on mobile (slide-in drawer)
- **Content header**: `h-14 px-6`, contains page title (left), primary action button (right)
- **Content area**: `p-6`, scrollable, `bg-background`

---

## 4. Color System

### Named Palette Tokens

```
--color-accent:        #E8572A   /* Warm coral-orange — brand accent */
--color-accent-hover:  #D14820   /* Darkened accent for hover */
--color-accent-light:  #FBE8E2   /* Tinted accent for bg highlights */

--color-surface-0:     #F5F3EE   /* Page background — cream white */
--color-surface-1:     #F0EDE6   /* Subtle off-white for alternating sections */
--color-surface-2:     #E8E4DC   /* Elevated surface — cards on surface-0 */
--color-surface-inv:   #1A1916   /* Dark inverse background */
--color-surface-inv-2: #242320   /* Raised surface on dark bg */

--color-text-primary:  #111110   /* Near-black body text */
--color-text-secondary:#5A5955   /* Muted labels, metadata */
--color-text-tertiary: #9A9894   /* Placeholder, disabled */
--color-text-inverse:  #F5F3EE   /* Text on dark surfaces */
--color-text-inv-muted:#9A9894   /* Muted text on dark surfaces */

--color-border:        #E0DDD6   /* Default border */
--color-border-strong: #C8C4BC   /* Emphasized border, hover state */
--color-border-inverse:#2E2C29   /* Border on dark surfaces */

--color-success:       #1D6A45
--color-success-bg:    #E8F5EE
--color-warning:       #92600A
--color-warning-bg:    #FEF3DC
--color-error:         #B91C1C
--color-error-bg:      #FEE2E2
--color-info:          #1D4ED8
--color-info-bg:       #EFF6FF
```

### Semantic Mapping
| Role | Token |
|---|---|
| Page background | `surface-0` |
| Card/panel surface | `#FFFFFF` or `surface-2` |
| Inverse section | `surface-inv` |
| Primary text | `text-primary` |
| Secondary/label text | `text-secondary` |
| Accent CTA, highlight word | `accent` |
| Default border | `border` |
| Focus ring | `accent` at 40% opacity, 3px offset |
| Success/warn/error/info | semantic tokens above |

### Accent Color Frequency Rules (Critical)
The accent color (`#E8572A`) is **high-value and scarce**. Overuse destroys its power.

**Permitted uses:**
- Primary CTA button fill (one per viewport)
- Exactly one word in the hero headline (inline `<span class="text-accent">`)
- Final CTA section full-bleed background
- Active nav link indicator (3px left border or underline)
- Pricing "featured" card top border accent stripe

**Forbidden uses:**
- Body text or paragraph copy
- Card backgrounds (except final CTA section)
- Secondary CTAs or ghost buttons
- Icon fills (use `text-secondary` instead)
- More than 3 simultaneously visible accent instances above the fold

### Contrast Requirements
- All body text on `surface-0`: minimum 7:1
- `text-secondary` on white: minimum 4.5:1
- Text on `accent` background: white (`#FFFFFF`) only — never `text-primary`
- Forbidden: `text-secondary` on `surface-1` (fails 4.5:1 — use `text-primary` instead)

---

## 5. Typography System

### Font Families
```css
--font-display: 'DM Serif Display', Georgia, serif;      /* Editorial headlines */
--font-sans:    'Geist', 'Inter fallback', sans-serif;   /* UI, body, labels */
--font-mono:    'Geist Mono', 'Fira Code', monospace;    /* Code, data values */
```

### Font Combination Rule
- `font-display` (serif): hero headlines, pull quotes, large testimonial text only. **Never** in navigation, UI labels, buttons, dashboard, or auth forms.
- `font-sans`: everything else — body, labels, nav, buttons, dashboard, auth.
- The serif signals editorial voice; the sans signals product confidence. Do not mix within a single section's body copy.

### Type Scale

| Name | Size | Weight | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|
| **Display XL** | `clamp(64px, 9vw, 120px)` | 400 (serif) | 0.95 | -0.03em | Hero headline |
| **Display L** | `clamp(48px, 6vw, 80px)` | 400 (serif) | 1.0 | -0.025em | Section headline |
| **Display M** | `clamp(36px, 4vw, 56px)` | 400 (serif) | 1.05 | -0.02em | Sub-section headline |
| **Heading** | `24px` | 500 (sans) | 1.25 | -0.01em | Card titles, dashboard headers |
| **Subheading** | `18px` | 500 (sans) | 1.35 | -0.005em | Sub-card, sidebar labels |
| **Body L** | `18px` | 400 (sans) | 1.7 | 0 | Hero subheadline, feature desc |
| **Body** | `16px` | 400 (sans) | 1.65 | 0 | Default body copy |
| **Body S** | `14px` | 400 (sans) | 1.6 | 0 | Card body, secondary info |
| **Label** | `13px` | 500 (sans) | 1.4 | 0.02em | Form labels, table headers |
| **Kicker** | `12px` | 500 (sans) | 1.4 | 0.08em | Section kicker labels (uppercase) |
| **Metadata** | `12px` | 400 (sans) | 1.4 | 0 | Timestamps, tags, footnotes |
| **Data** | `14px` | 500 (mono) | 1.4 | 0 | Numeric dashboard values |

### Display-Tier Rules
- Hero headline uses Display XL. No exceptions — do not reduce for comfort.
- Apply `clamp()` so it scales gracefully from 375px to 1440px viewports.
- One word in the hero headline may receive `class="text-accent font-display italic"` for editorial emphasis.
- Ambient typography (ghosted large text behind content): `font-display`, `opacity: 0.04`, `font-size: clamp(120px, 20vw, 240px)`, `z-index: 0`, `pointer-events: none`, `user-select: none`. Used maximum once per page, typically in the hero or a dark band section.

### Kicker Labels
Every major section starts with a kicker label above the headline:
```html
<p class="kicker">— Services</p>
```
```css
.kicker {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}
/* On dark sections: color: var(--color-text-inv-muted) */
/* With accent: color: var(--color-accent) — use only in hero or final CTA */
```

---

## 6. Elevation and Shadows

### Shadow Scale
```css
--shadow-1: 0 1px 2px rgba(0,0,0,0.04);                          /* Subtle lift — inputs, pills */
--shadow-2: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);  /* Cards at rest */
--shadow-3: 0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05); /* Cards hovered, nav */
--shadow-4: 0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06); /* Modals, sheets */
--shadow-5: 0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08); /* Dropdowns over complex bg, hero media */
```

### Usage Matrix

| Surface | Rest | Hover | Active/Open |
|---|---|---|---|
| Standard card | `shadow-2` | `shadow-3` | `shadow-2` |
| Pricing card (featured) | `shadow-3` | `shadow-4` | `shadow-3` |
| Dashboard widget/KPI | `shadow-1` | `shadow-2` | `shadow-1` |
| Nav bar (after scroll) | `shadow-2` | — | — |
| Modal / Sheet | `shadow-4` | — | — |
| Dropdown / Popover | `shadow-5` | — | — |
| Toast notification | `shadow-4` | — | — |
| Hero media frame | `shadow-5` | — | — |
| Primary CTA button | `none` | `0 4px 16px rgba(232,87,42,0.35)` | `none` |
| Input field | `shadow-1` | `shadow-1` | `shadow-1` + focus ring |

---

## 7. Borders, Radius, and Surfaces

### Border Rules
- Default border: `1px solid var(--color-border)` — use on cards, inputs, panels
- Strong border: `1px solid var(--color-border-strong)` — hover state, featured elements
- Inverse border: `1px solid var(--color-border-inverse)` — on dark sections
- Accent stripe: `2px solid var(--color-accent)` — featured card top, active nav item, never full border
- Dividers: `1px solid var(--color-border)`, `opacity: 0.6`

### Radius Scale
| Component | Radius |
|---|---|
| Pill button, badge, tag | `9999px` |
| Primary CTA button | `10px` |
| Secondary button | `8px` |
| Input, select, textarea | `8px` |
| Standard card | `16px` |
| Large card / hero media frame | `20px` |
| Modal / Sheet | `20px` |
| Dropdown | `12px` |
| Toast | `12px` |
| Sidebar | `0` |
| Image crops in cards | `12px` |
| Kicker label | `4px` |

### Surface Layering
```
Canvas        background (#F5F3EE / surface-0)
Surface       white card on canvas (#FFFFFF, shadow-2)
Raised        white card on white section (#FFFFFF, shadow-3, stronger border)
Overlay       modal/sheet on dimmed canvas (shadow-4, white, radius-20)
Inverse       dark band sections (surface-inv, inverse text/borders)
```

---

## 8. Interaction Model

### Transition Base Rules
```css
/* Buttons */
transition: background-color 150ms ease, box-shadow 150ms ease, transform 100ms ease;

/* Cards */
transition: box-shadow 200ms ease, transform 200ms ease;

/* Links / nav items */
transition: color 150ms ease, opacity 150ms ease;

/* Inputs */
transition: border-color 150ms ease, box-shadow 150ms ease;

/* Pricing cards */
transition: box-shadow 250ms ease, transform 250ms ease, border-color 250ms ease;

/* Dashboard widgets */
transition: box-shadow 200ms ease, background-color 200ms ease;

/* Table rows */
transition: background-color 120ms ease;

/* Overlays / modals */
transition: opacity 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
```

### Hover States by Component

**Primary CTA Button**
```
rest:   bg-accent, shadow-none, scale(1)
hover:  bg-accent-hover, shadow: 0 4px 16px rgba(232,87,42,0.35), scale(1.01)
active: bg-accent-hover, scale(0.98), shadow-none
```

**Secondary / Ghost Button**
```
rest:   bg-transparent, border-border, text-primary
hover:  bg-surface-1, border-border-strong
active: bg-surface-2, scale(0.98)
```

**Standard Card**
```
rest:   shadow-2, translateY(0)
hover:  shadow-3, translateY(-2px)
active: shadow-2, translateY(0)
```

**Pricing Card (non-featured)**
```
rest:   shadow-2, border-border, translateY(0)
hover:  shadow-4, border-border-strong, translateY(-4px)
```

**Pricing Card (featured)**
```
rest:   shadow-3, border-top: 2px accent, translateY(-8px) [always elevated]
hover:  shadow-4, translateY(-12px)
```

**Navigation Links**
```
rest:   text-secondary, no underline
hover:  text-primary
active: text-primary, accent underline (2px, scaleX from 0→1 on hover, 200ms ease)
```

**Dashboard Widget / KPI Card**
```
rest:   shadow-1, bg-white
hover:  shadow-2, bg-white
```

**Table Rows**
```
rest:   bg-transparent
hover:  bg-surface-0 (subtle tint)
selected: bg-accent-light, left border 2px accent
```

**Links (inline)**
```
rest:   text-primary, underline offset-2, decoration-border
hover:  text-accent, decoration-accent
```

### Focus-Visible Treatment
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: inherit;
}
/* Inputs use box-shadow instead of outline: */
input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(232, 87, 42, 0.25);
  border-color: var(--color-accent);
}
```

### Disabled States
```css
[disabled], [aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## 9. Animation System

### Motion Principles
- **Subtle**: Nothing should call attention to itself. Motion serves meaning.
- **Purposeful**: Every animation communicates state change or spatial relationship.
- **Non-distracting**: Page intro is the one moment of visual expression. After that, motion is fast and utilitarian.
- **Physical**: Prefer `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like) for entrances, `ease-in` for exits.

### Named Animation Presets

**Page Intro** — elements cascade in on first paint
```css
@keyframes page-intro {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Hero headline: duration 600ms, easing ease-out, delay 0ms */
/* Hero subheadline: duration 500ms, delay 120ms */
/* Hero CTA: duration 400ms, delay 240ms */
/* Hero media: duration 700ms, delay 180ms */
```

**Section Reveal** — triggered when section enters viewport (IntersectionObserver, threshold 0.15)
```css
@keyframes section-reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* duration: 500ms, easing: cubic-bezier(0.16, 1, 0.3, 1), delay: 0ms */
```

**Staggered Cards** — children animate with progressive delay
```css
/* Same keyframe as section-reveal */
/* Each card: delay = index * 80ms, max 4 staggered children then simultaneous */
/* duration: 450ms, easing: cubic-bezier(0.16, 1, 0.3, 1) */
```

**Hover Lift** — card and button hover elevation
```css
/* Not a keyframe — use transition + transform in hover state */
/* Cards: translateY(-2px), 200ms ease */
/* Featured pricing card: translateY(-4px), 250ms ease */
```

**CTA Pulse/Glow** — primary CTA button subtle pulse (use sparingly, final CTA section only)
```css
@keyframes cta-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(232, 87, 42, 0); }
  50%       { box-shadow: 0 0 0 8px rgba(232, 87, 42, 0.15); }
}
/* duration: 2400ms, iteration: infinite, easing: ease-in-out */
/* Only on the final CTA section's primary button. Nowhere else. */
```

**Modal / Sheet Enter**
```css
@keyframes modal-enter {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
/* duration: 250ms, easing: cubic-bezier(0.16, 1, 0.3, 1) */
/* Backdrop: fade in opacity 0→0.5, duration 200ms, ease */
```

**Modal / Sheet Exit**
```css
@keyframes modal-exit {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.96); }
}
/* duration: 150ms, easing: ease-in */
```

**Toast Enter**
```css
@keyframes toast-enter {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
/* duration: 300ms, easing: cubic-bezier(0.16, 1, 0.3, 1) */
```

**Toast Exit**
```css
@keyframes toast-exit {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(16px); }
}
/* duration: 200ms, easing: ease-in */
```

### Reduced-Motion Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
All `IntersectionObserver` section reveals must still fire (making content visible) — only the animation is suppressed. Never leave content hidden for reduced-motion users.

---

## 10. Authentication Experience

### Layout Structure (All Auth Routes)
```
Full viewport, centered column layout:
- Left panel (60% on lg+): form content
- Right panel (40% on lg+): trust/brand content (decorative, hidden on mobile)
- Mobile: form panel only, full width, centered with padding

Form card: max-w-[440px], mx-auto, centered vertically, py-16 px-8
```

### Trust Panel (Right Side — Desktop Only)
- Background: `surface-inv` (`#1A1916`)
- Contains: brand wordmark, 1 featured testimonial quote (serif, large), client logo strip (3 logos, white/muted), one social proof stat
- No interactive elements — purely trust-building
- Hidden below `lg` breakpoint

### Sign In (`/login`)
**Required elements (in order):**
1. Brand wordmark (top-left, links to `/`)
2. Headline: "Welcome back." (Display M, serif)
3. Subheadline: "Sign in to your account." (Body, text-secondary)
4. Email input (label: "Email")
5. Password input (label: "Password") + "Forgot password?" link (right-aligned, 13px)
6. Primary CTA: "Sign in" (full-width, accent)
7. Divider: "or"
8. OAuth option (Google) — icon + "Continue with Google"
9. Footer: "Don't have an account? [Sign up →]"

**Interaction States:**
- **Idle**: default field appearance
- **Focus**: accent border + glow ring
- **Invalid**: `error` border, inline error message below field (13px, error-color, with ⚠ icon), field label turns error-color
- **Submitting**: button text → spinner + "Signing in…", button disabled, fields read-only
- **Success**: brief success state (checkmark, 400ms), then redirect
- **Failure**: banner above form: "Incorrect email or password." (non-specific for security)
- **Locked account**: banner: "Account locked. Check your email for unlock instructions." — do not reveal lockout threshold

### Sign Up (`/signup`)
**Required elements:**
1. Wordmark
2. Headline: "Create your account." (Display M)
3. First name + Last name (side by side on md+)
4. Email
5. Password (with inline strength meter: 4 segments, color-coded — error/warning/warning/success)
6. Terms checkbox: "I agree to the [Terms] and [Privacy Policy]"
7. Primary CTA: "Create account"
8. Footer: "Already have an account? [Sign in →]"

**Password strength meter:**
```
Weak:   1/4 segments, error color
Fair:   2/4 segments, warning color
Good:   3/4 segments, warning-light color
Strong: 4/4 segments, success color
```
Meter appears after first keystroke in password field. Accompanied by a single-line hint (e.g., "Add a number or symbol").

### Forgot Password (`/forgot-password`)
**Required elements:**
1. Wordmark
2. Back link: "← Back to sign in" (top-left of form area)
3. Headline: "Reset your password."
4. Subtext: "Enter your email and we'll send a reset link." (text-secondary)
5. Email input
6. CTA: "Send reset link"
7. **Post-submit success state** (replaces form, same card): checkmark icon (success color) + "Check your inbox." + "We sent a link to [email]. It expires in 15 minutes." + "Resend link" (text button, disabled for 60s with countdown)

### Reset Password (`/reset-password?token=...`)
**On load**: validate token server-side.
- **Valid token**: show form
- **Invalid/expired token**: replace form with error state — "This link has expired." + "Request a new link →"

**Form elements:**
1. Headline: "Set a new password."
2. New password input + strength meter
3. Confirm password input (validates match on blur)
4. CTA: "Set new password"
5. On success: "Password updated." + auto-redirect to `/login` after 2s + manual link

### Field Validation Timing
- **Email**: validate format on blur (not on keystroke)
- **Password**: strength meter on keystroke; format validation on blur
- **Confirm password**: validate match on blur of confirm field
- **Required fields**: show error only after first submit attempt, not on initial blur

### Accessibility Requirements
- Form must be fully operable by keyboard: Tab order = top-to-bottom, logical, no traps
- All inputs have explicit `<label>` associations (not placeholder-only)
- Error messages are announced via `role="alert"` or `aria-live="polite"`
- Error messages are linked to their input via `aria-describedby`
- Focus returns to the triggering element after modal/toast dismiss
- Auth forms: `autocomplete` attributes required (`email`, `current-password`, `new-password`)
- Submit button is the only `type="submit"` — Enter key submits the form

---

## 11. Dashboard System

### Layout Blueprint
See Section 3 for zone dimensions. Dashboard uses the full post-login shell.

### Top Bar Contents (Left → Right)
1. Logo / wordmark (links to `/dashboard`)
2. Global search input (expands on focus, `cmd+K` shortcut, `max-w-[320px]`)
3. Spacer (flex-grow)
4. Notification bell (icon button, badge count)
5. Help icon (opens intercom or docs)
6. Avatar + name (opens profile dropdown)

### Sidebar Contents
- Section groups separated by `8px` gap and optional label
- Items: icon (20px) + label, `py-2 px-3`, `rounded-8`, hover: `bg-surface-1`
- Active: `bg-accent-light`, `text-accent`, left border `2px accent`
- Collapsed state: icons only, tooltips on hover
- Collapse toggle: chevron icon, bottom of sidebar

### First-Screen Modules (Dashboard Home)
**Above the fold (1440px):**
1. **KPI Row**: 4 stat cards, full-width, `grid-cols-4`
2. **Recent Activity Feed**: left column (8/12), chronological list
3. **Tasks / Alerts Panel**: right column (4/12), actionable items

**KPI Card Anatomy:**
```
┌──────────────────────────────┐
│ Label (13px, text-secondary) │
│ Value (32px, font-mono, 500) │
│ Delta (13px) ↑ +12% vs last  │
└──────────────────────────────┘
bg: white, shadow-1, radius-12, p-5
Delta color: success if positive, error if negative, text-secondary if neutral
```

**Quick Actions Row:** Below KPI row on some dashboard states. 3-4 icon+label action buttons (`rounded-10`, border, hover: `bg-surface-1`). These are the most common tasks for the current user role.

### Data-Dense Patterns

**Tables:**
- Header: `bg-surface-0`, `border-b border-border`, `label` typestyle, sticky on scroll
- Rows: `48px` height, `border-b border-border` at `opacity-60`
- Row hover: `bg-surface-0`
- Selected row: `bg-accent-light`, left border `2px accent`
- Column text: `body-s` for data, `metadata` for secondary fields
- Numeric columns: right-aligned, `font-mono`
- Filters: above table, left side — pill-style filter chips, active filter gets accent bg
- Sort: column header click → sort icon (↕ → ↑ or ↓), current sort column header `text-primary`
- Pagination: below table, right-aligned — "Showing 1–25 of 142" + prev/next + page size select
- Bulk actions: appear in a bar above the table when rows are selected — "3 selected · [Archive] [Delete]"

**Detail Side Panel:**
- Slides in from right, `w-[480px]` desktop, full-width mobile (bottom sheet)
- `shadow-4`, `bg-white`, `border-l border-border`
- Header: title + close button (X), `border-b`
- Scrollable body

### Role/Permission-Aware UI

| Element | Admin | Member | Viewer |
|---|---|---|---|
| Delete actions | Visible + enabled | Hidden | Hidden |
| Edit actions | Visible + enabled | Visible + enabled | Hidden |
| Billing section | Visible | Hidden | Hidden |
| Team management | Visible | Hidden | Hidden |
| Export button | Visible | Visible | Visible |
| Settings sidebar item | Visible | Visible (limited) | Hidden |

**Empty access state:** "You don't have permission to view this. [Request access →]" — centered in the content area, icon + heading + subtext + CTA. Never show a broken layout.

### Responsive Dashboard Behavior
| Breakpoint | Behavior |
|---|---|
| `375` | No sidebar (hidden), top bar collapses search, KPI cards stack 1 col, tables scroll horizontally |
| `768` | Sidebar icon-only (60px), KPI cards 2-col grid, table shows 4 columns max |
| `1024` | Full sidebar (240px), KPI cards 2-col, full table |
| `1440` | Full sidebar, KPI 4-col, table with all columns, detail panel fits without overlay |

---

## 12. Application Shell (Post-Login)

### Navigation Persistence
- Sidebar is always visible on `lg+`. Never auto-hides on navigation.
- On `md` and below: sidebar is hidden, toggled via hamburger in top bar. Overlay drawer, `z-50`.
- Sidebar collapse (icon-only) persists in `localStorage` as user preference.

### Breadcrumbs
- Displayed in the content header bar below the top bar.
- Format: `Dashboard / Section / Current Page` — `text-secondary` with `/` separators, current page `text-primary`.
- Hidden on top-level pages (dashboard home).

### Content Header (Per Page)
```
Left: Page title (Heading typestyle) + optional badge (status, count)
Right: Primary action button (accent) + optional secondary action (ghost)
```
Page title does not repeat the breadcrumb — it is the current page name only.

### Notification Behavior
- Bell icon shows numeric badge (max display: "9+")
- Click opens a dropdown panel (`w-[360px]`, `shadow-5`, `max-h-[480px]` scrollable)
- Unread items: left border `2px accent`, `bg-accent-light`
- "Mark all read" text button at top of panel
- Each notification: icon + title + body preview (1 line) + timestamp

### Global Search
- Activated by click or `cmd+K`
- Expands into a modal-style search overlay, full-width input, results below
- Results grouped by type: Pages, Records, Actions
- Keyboard navigable (arrow keys, Enter to select, Escape to close)

### Profile Dropdown
- Avatar click → dropdown `w-[200px]`
- Items: Profile settings, Team settings (admin only), Billing (admin only), Divider, Sign out
- Sign out is always last, separated by divider, `text-error` color

---

## 13. State Design

### Loading States

**Page-level loading**: skeleton layout matching the target page structure. Use animated shimmer: `bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1`, `background-size: 200%`, keyframe slides left→right over `1500ms`.

**Skeleton shapes by surface:**
| Surface | Skeleton |
|---|---|
| KPI card | Full card shimmer, preserve card dimensions |
| Table | Header row solid + 6 shimmer rows at 48px each |
| Activity feed | 4 rows: circle (avatar) + 2 line shimmers |
| Form | Input field shimmers stacked with label shimmers |
| Card grid | 3 card shimmers in the grid layout |

**Inline / component loading**: spinner (16px, stroke-based SVG, accent color) centered in the component. Spinner replaces content — do not overlay a spinner on top of stale content unless explicitly a refresh action.

### Empty States
Every empty state requires: icon (40px, muted), headline (Heading), subtext (Body S, text-secondary), primary CTA (if an action exists to fill the state).
- Empty table: "No results found." + filter reset CTA if filters are active, or create CTA if no records exist.
- Empty activity feed: "No activity yet. Your actions will appear here."
- Empty dashboard (new user): full onboarding prompt (first-run wizard entry point).

### Error States
- **Inline field error**: red border + error icon + message below field
- **Form-level error**: banner above form, `bg-error-bg`, `text-error`, `border-l-4 border-error`, dismissible
- **Page-level error**: centered — icon + "Something went wrong." + body message + "Try again" button. Log error to observability system.
- **Network error**: toast notification, persistent until resolved — "Connection lost. Retrying…" + spinner.

### Offline State
Full-page state or persistent top banner (depends on surface). Banner: `bg-warning-bg`, `text-warning`, "You're offline. Changes may not save."

### Permission Denied (403)
Centered in content area: lock icon + "Access restricted." + role-aware message + "Request access →" CTA.

### 404
Centered: large serif "404" (Display M), headline "Page not found.", subtext, "← Go home" CTA. No sidebar — full-page treatment.

### Retry & Recovery
- All failed data fetches expose a "Try again" text button adjacent to the error message
- Failed form submissions re-enable the submit button and focus the first error field
- Session timeout: modal (do not navigate away) with "Sign in again" — on success, re-submit the last action if possible

---

## 14. Form UX Standards

### Validation Strategy
- **Client-side**: format validation (email format, password length) — on blur after first interaction
- **Server-side**: uniqueness, authorization — on submit. Errors returned per field.
- **Real-time**: only for password strength meter and confirm-password match

### Error Copy Rules
- Specific: "Enter a valid email address." not "Invalid input."
- Actionable: "Password must be at least 8 characters." not "Password too short."
- Never expose server internals in error messages.

### Submit Lifecycle
1. User clicks submit
2. Client validates all fields — if errors, highlight fields, scroll to first error, do not submit
3. Button becomes: disabled + spinner + loading label ("Saving…", "Signing in…")
4. All fields become `read-only` (not disabled — to preserve form data)
5. On success: brief success state → navigate or update UI
6. On server error: re-enable button, display field-level or form-level error, remove loading state

### Recovery Flows
- **Expired session mid-form**: session timeout modal appears. User re-auths. Form state is preserved in component state (not lost). On re-auth success, form submission is retried.
- **Network failure**: button re-enables with toast "Connection error — please try again."
- **Duplicate submission prevention**: button disabled after first click until response received. Include idempotency key on sensitive mutations.

---

## 15. Security & Trust UX

### Session Expiry
- **Soft expiry** (idle timeout warning at T-5min): banner notification "Your session will expire in 5 minutes. [Stay signed in]"
- **Hard expiry**: modal overlay (cannot be dismissed without action) — "Your session has expired. Sign in to continue." → inline auth modal, not full redirect when possible.
- Post re-auth: restore user to previous state with minimal disruption.

### Sensitive Action Confirmation
- Destructive actions (delete, revoke, cancel subscription): confirmation modal. Headline names the specific action and object ("Delete project 'Alpha'?"). Body explains consequences. CTA: "Delete project" in `error` color. Cancel is default-focused.
- Non-reversible actions: require typing the resource name to confirm (e.g., "Type the project name to confirm").
- Bulk actions: "This will affect 12 records. This cannot be undone." — explicit count always shown.

### Device/Session Communication
- "New sign-in from [device]" notification in notification panel (not email-only)
- Active sessions visible in Profile Settings with "Sign out" per session
- Suspicious activity triggers a banner on next login: "We noticed a sign-in from a new location. Was this you? [Yes, that was me] [No, secure my account]"

---

## 16. Observability Hooks

### Event Naming Convention
`[surface]_[object]_[action]`
Examples: `marketing_cta_clicked`, `auth_signup_submitted`, `dashboard_filter_applied`

### Required Event Categories

**Marketing funnel:**
- `page_viewed` — route, referrer, utm params
- `marketing_cta_clicked` — cta_label, cta_location (hero/pricing/final)
- `pricing_plan_selected` — plan_name
- `marketing_scroll_depth` — depth_percent (25/50/75/100)

**Auth funnel:**
- `auth_signup_started`
- `auth_signup_submitted` — method (email/google)
- `auth_signup_completed`
- `auth_login_attempted` — method
- `auth_login_succeeded`
- `auth_login_failed` — reason (invalid_credentials/locked/network)
- `auth_password_reset_requested`
- `auth_session_expired`

**Dashboard:**
- `dashboard_viewed` — user_role
- `dashboard_filter_applied` — filter_type, filter_value
- `dashboard_export_triggered` — export_format
- `dashboard_record_opened` — record_type
- `dashboard_bulk_action` — action, count

### Payload Shape Principles
Every event includes: `timestamp` (ISO), `user_id` (if authed), `session_id`, `route`, `device_type`. Custom properties are flat — no nested objects in event payloads.

---

## 17. Component Recipes

### Hero (Marketing)

**Three named layout archetypes — choose one per project:**

**Archetype A — Split-Frame (Default)**
```
Left (7/12): Kicker → Display-XL serif headline (1 word in accent italic) →
             Body-L subheadline → CTA row (primary + secondary) →
             Inline proof row (3 stats: number + label)
Right (5/12): Media frame (rounded-20, shadow-5, border) containing
              product screenshot, 3D render, or mockup. Slightly overlaps
              the section below via negative margin-bottom.
```

**Archetype B — Typographic-Editorial**
```
Full width. Oversized Display-XL headline broken across 2–3 lines,
mixing upright and italic, with one word in accent color. No hero image.
Subheadline in a narrower column (max-w-[560px]), centered or left-aligned.
Ambient ghosted word(s) in the background at opacity-4.
CTA centered below.
```

**Archetype C — Full-Bleed Photo**
```
Full-width section with background image (dark overlay at 50%).
Headline and CTA centered, all text white.
Image must be high quality, not stock. Minimum 1440×800px.
KPI stats row overlaps the bottom of the image with a white card band.
```

**Hero structure (Archetype A):**
```
kicker: "— Certified Bubble Partner"
headline: "Apps that <em>actually</em> ship."  (accent italic on "actually")
subheadline: "We build Bubble products for ambitious founders..."
cta_primary: "Start your project →"
cta_secondary: "See recent builds ↗" (ghost, text-secondary)
proof_stats: ["120+ Apps shipped", "4.9/5 Avg rating", "21d Avg time to live"]
media: product mockup in bordered frame
```

### Social Proof Strip

**Three variants (choose based on project maturity):**
- **A — Logo Marquee**: infinite scroll strip of client logos, grayscale, hover: full color. Speed: 40s per loop. 2× duplicated for seamless loop.
- **B — Stat Row (inline hero)**: 3 numbers + labels displayed horizontally in the hero section — `font-mono font-500` value, `text-secondary label` below. Separated by thin vertical dividers.
- **C — Logo Grid + Quote**: static grid of 5–6 logos (grayscale) above a featured testimonial quote block.

Default: Variant A for logo-rich projects, Variant B when stats are the stronger proof.

### Services / Features Grid

```
Kicker → Display-M headline → Body subheadline
↓
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
```

**Service Card:**
```
┌────────────────────────────────┐
│ Icon (24px, accent or muted)   │
│ Heading (card title typestyle) │
│ Body-S description (3 lines)   │
│ → Explore service (link, sm)   │
└────────────────────────────────┘
bg: white, border, radius-16, p-6, shadow-2
hover: shadow-3, translateY(-2px)
```

Icon style: outline SVG, 24px, `stroke-2`. Accent-colored only for the primary/featured service; muted for others.

### Case Studies Grid

**Full-bleed colored cards** — each card has a unique background color:
```
┌─────────────────────────────────────────┐
│ [Full-bleed bg: brand color per project]│
│                                         │
│ Project name (Display-M, white, serif)  │
│                                         │
│ ─────────────────────────────────────── │
│ Outcome metric (Body-S, white/80%)      │
│                                      →  │
└─────────────────────────────────────────┘
radius-20, aspect-ratio: 4/3, overflow-hidden
hover: scale(1.02), shadow-4, 300ms ease
```

Use a set of 4–5 distinct warm/neutral background colors across cards. Never use photos in these cards.

### Process / Timeline

Numbered steps with a connective line:
```
01 → 02 → 03 → 04  (horizontal on desktop, vertical on mobile)
Each step: large number (Display-L, text-border/30, absolute positioned behind)
           Heading (step title)
           Body-S (description)
```
Numbers are decorative — low contrast, behind the content. Connector: 1px dashed line between steps.

### Pricing Section (Dark Inverse Band)

```
Dark bg (surface-inv), full-width
Kicker → Display-M headline (inverse text)
↓
3-column grid: Starter | Studio (featured) | Scale

Standard card: dark-surface, border-inverse, radius-16
Featured card: accent top border 2px, translateY(-8px) always, shadow-4, slightly larger
```

**Pricing card anatomy:**
```
Plan name (Subheading, inverse)
Price (Display-M, inverse, mono)
Billing period (Metadata, inv-muted)
[CTA button]
Divider
Feature list (Body-S, checkmark icon in success-color per item)
```

### Testimonial

Single large quote — not a grid:
```
Star row (5 stars, accent color)
Quote (Display-M or Body-L, serif, max-w-[720px], centered)
Attribution: Avatar (40px circle) + Name + Title + Company
```
If carousel: prev/next arrows, auto-advance every 6s, pause on hover. Dots indicator below.

### Final CTA Section

```
Full-width band, bg: accent (#E8572A)
Kicker (white, low opacity)
Headline (Display-M, white, serif)
Subtext (Body, white at 80%)
CTA button (white bg, accent text, hover: white/90) + secondary (text-white, underlined)
Optional: email capture input inline with button
```
CTA button has `animation: cta-pulse` on this section only.

### Auth Form Card
```
max-w-[440px], centered, bg-white, radius-20, shadow-4, p-10
No border (shadow defines the surface)
Wordmark top-left (24px)
Headline: Display-M serif, margin-bottom 8px
Subheadline: Body, text-secondary, margin-bottom 32px
Form fields stacked, gap-5
Submit CTA: full-width, accent
```

### Error Banner (Auth)
```
bg-error-bg, border-l-4 solid error, radius-right-8, p-4
Icon (⚠) + message (Body-S, error color)
Dismissible (X button) for non-critical errors
Non-dismissible for locked account state
```

### Dashboard KPI Row
```
grid-cols-2 lg:grid-cols-4 gap-4
Each card: bg-white, shadow-1, radius-12, p-5
Label: 13px, text-secondary, uppercase, letter-spacing 0.04em
Value: 32px, font-mono, font-500, text-primary
Delta: 13px, flex row — arrow icon + percent + "vs last period"
       success color if positive, error if negative
```

### Activity Feed
```
Vertical list, gap-0, divided by border-b
Each item: 48px row — avatar (32px) + content + timestamp (right-aligned, metadata)
Content: Actor name (font-500) + action text (text-secondary)
Hover: bg-surface-0
Max visible: 8 items, "View all activity →" link below
```

### Data Table (Dashboard)
See Section 11 for full spec. Structure:
```
[Filter chips row] [Search input] [Export button]
[Table: sticky header, sortable columns, 48px rows]
[Pagination row]
```

### Empty State
```
Centered in its container, py-16
Icon: 40px, muted stroke SVG
Headline: Heading typestyle
Subtext: Body-S, text-secondary, max-w-[320px]
CTA: Primary button (if action exists) or text link
```

---

## 18. Responsive Rules

### Breakpoints
```
xs:  375px  (mobile default)
sm:  640px  (large mobile / small tablet)
md:  768px  (tablet)
lg:  1024px (small desktop)
xl:  1440px (full desktop)
```

### Grid Collapse Rules
| Component | 375 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Hero (A) | Stack: text above, media below | Stack | Split 7/5 | Split 7/5 |
| Services grid | 1 col | 2 col | 3 col | 3 col |
| Case studies | 1 col | 2 col | 2 col | 2 col |
| Pricing | 1 col (stacked) | 1 col | 3 col | 3 col |
| KPI row | 2 col | 2 col | 4 col | 4 col |
| Dashboard sidebar | Hidden | Icon-only | Full | Full |
| Auth layout | Form only | Form only | Split | Split |

### Typography Clamp Behavior
- `Display-XL`: `clamp(44px, 9vw, 120px)` — `44px` on 375, `120px` on 1440
- `Display-L`: `clamp(36px, 6vw, 80px)`
- `Display-M`: `clamp(28px, 4vw, 56px)`
- Body and labels: fixed sizes, no clamping
- Line-height increases by 0.05 at 375 for display sizes (tighter tracking causes issues on small screens — loosen it)

### Section Gap at Mobile
`section-gap` reduces at mobile: `clamp(56px, 10vw, 160px)` — still generous, but not 160px on a 375 screen.

### Auth Adaptations (Narrow)
- Trust panel hidden below `lg`
- Form card has no shadow at mobile (`box-shadow: none`) — full-bleed form in the viewport
- Logo at top-center, not top-left
- Extra bottom padding (`pb-16`) to clear mobile browser UI

### Dashboard Adaptations (Narrow)
- Top bar: hamburger replaces sidebar toggle; search icon only (opens modal on click)
- Tables: horizontal scroll wrapper, minimum 3 columns visible, rest hidden behind scroll
- KPI cards: 2-column grid
- Detail panel: full-screen bottom sheet (not side panel)

---

## 19. Content and Microcopy Rules

### Voice by Surface
| Surface | Voice |
|---|---|
| Marketing | Confident, founder-to-founder. Direct. No jargon. Short punchy sentences. Active voice. |
| Auth | Calm, helpful. "Welcome back." not "Please enter your credentials." |
| Dashboard | Functional. Labels not sentences. Data speaks, UI doesn't. |
| Errors | Specific + human. Never technical codes in UI. Never blame the user. |
| Empty states | Honest + encouraging. "Nothing here yet." + helpful next step. |

### CTA Wording Patterns
- Primary CTA: verb + object ("Start your project", "Create account", "Send reset link")
- Never: "Submit", "Click here", "Learn more" as a standalone CTA
- Arrow suffixes: use `→` for internal navigation, `↗` for external links
- CTA on dark/accent sections: shorter ("Get started", "Book a call")

### Proof Formatting
- Stats: large number (Display-M, mono) + short label below ("Apps shipped", "Avg rating")
- Logos: grayscale, equal height (28–32px), max 6 in a row
- Testimonial quote: full sentence, no ellipsis. Attribution always includes name + title + company.
- Outcome metrics: specific and attributed ("$420k ARR in 90 days — Looper Studio")

### Error Copy Standards
- Form field: "Enter a valid [field name]." or "[Field name] is required."
- Auth: "Incorrect email or password." (never specify which is wrong)
- Network: "Something went wrong. Please try again."
- Copy length: error messages max 12 words. Helper text max 16 words.

### Copy Length Limits
| Section | Headline | Subtext |
|---|---|---|
| Hero | Max 8 words | Max 25 words |
| Service card | Max 5 words | Max 20 words |
| Case study card | Project name only | Outcome stat (max 8 words) |
| Pricing | Plan name | Feature list (max 8 items) |
| Testimonial | Quote: max 60 words | Attribution: name + title |
| Dashboard empty | Max 6 words | Max 20 words |
| Error message | Max 10 words | Max 20 words |

---

## 20. Implementation Handoff for AI Agent

### Tailwind Utility Direction

**Prefer:**
- `clamp()` in `style` prop for display-scale typography (Tailwind doesn't support fluid type natively)
- `grid-cols-[repeat(auto-fit,minmax(280px,1fr))]` for auto-responsive grids
- CSS custom properties for design tokens (`var(--color-accent)`) — define in `globals.css`
- `transition-[shadow,transform]` over `transition-all` (performance)
- `motion-reduce:transition-none` on all animated elements

**Avoid:**
- `text-purple-*`, `bg-purple-*`, `bg-blue-*` as primary colors — these produce generic output
- `shadow-lg`, `shadow-xl` from Tailwind — use custom shadow scale tokens
- `rounded-full` on non-pill elements
- `p-4` on marketing sections — use the `section-gap` class
- Inline `style` props for anything in the design token system — use `cn()` and token classes

### Custom Values vs Semantic Tokens
- **Custom values** (in `style` prop): only for one-off sizes that don't recur (`style={{ maxWidth: '440px' }}`)
- **Semantic tokens** (CSS vars in globals.css): all colors, all shadows, all radii, font families
- **Tailwind config extend**: font scale additions, custom shadow scale, spacing for section-gap

### Route-Level Implementation Checklist

**`/` (Marketing Home)**
- [ ] Nav: 56px, transparent, scrolls to solid at 80px, accent CTA button
- [ ] Hero: choose and implement one named archetype (A/B/C), Display-XL headline with accent word
- [ ] Inline proof stats row (3 stats in hero)
- [ ] Social proof strip (logo marquee or stat row)
- [ ] Services grid (3 cols, cards with icon + title + desc + link)
- [ ] Case studies grid (full-bleed colored cards, outcome metric)
- [ ] Process timeline (numbered steps, decorative large numbers)
- [ ] Pricing section (dark band, 3 plans, featured card elevated)
- [ ] Testimonial (single quote, serif, avatar attribution)
- [ ] Final CTA section (accent full-bleed, white button, cta-pulse animation)
- [ ] Footer (dark, 4-column, logo + nav + contact + newsletter)
- [ ] All sections have kicker labels
- [ ] Section cadence map colors applied correctly
- [ ] Page intro animation on hero elements
- [ ] Section reveals on scroll (IntersectionObserver)
- [ ] Reduced-motion fallback

**`/login`, `/signup`, `/forgot-password`, `/reset-password`**
- [ ] Split layout (form left, trust panel right on lg+)
- [ ] Trust panel: dark bg, testimonial quote, logo strip
- [ ] Form card: max-w-440, shadow-4, no border
- [ ] Correct field order and labels per spec
- [ ] Focus styles: accent ring on all inputs
- [ ] All interaction states: idle/focus/invalid/submitting/success/failure
- [ ] Error messages via `aria-live="polite"`
- [ ] `autocomplete` attributes on all auth fields
- [ ] Post-submit redirect preserves original destination
- [ ] Token validation on `/reset-password` load

**`/dashboard`**
- [ ] Full shell: top bar + sidebar + content header + content area
- [ ] Top bar: search (cmd+K), notification bell, avatar dropdown
- [ ] Sidebar: active state with accent, collapse to icon-only, mobile drawer
- [ ] KPI row: 4 cards, mono value, delta with color
- [ ] Activity feed: 8 rows, avatar, actor + action, timestamp
- [ ] Data table: sortable headers, hover rows, filter chips, pagination
- [ ] Role-aware visibility (admin/member/viewer per spec)
- [ ] All empty states implemented
- [ ] All loading states: skeleton shimmer
- [ ] Responsive: 2-col KPI at md, full at lg

**All routes:**
- [ ] `<title>` and `<meta description>` per route
- [ ] 404 and 403 pages implemented
- [ ] Offline banner implemented
- [ ] Toast notification system (enter/exit animations)
- [ ] Session expiry modal
- [ ] All focus-visible states visible and correct
- [ ] Contrast checked: all text passes 4.5:1 minimum

---

## 21. QA Acceptance Checklist

### Visual Consistency
- [ ] Accent color appears max 3 times above the fold on marketing pages
- [ ] Section cadence map colors match spec exactly (no all-white pages)
- [ ] Typography uses Display-XL at hero — never smaller than `clamp(44px, ...)`
- [ ] Section gaps are `clamp(56px, 10vw, 160px)` minimum — not 32px or 48px
- [ ] Shadows match the defined shadow scale — no Tailwind `shadow-lg` defaults
- [ ] All cards use specified border-radius values
- [ ] Dark sections use inverse text/border tokens (not primary tokens)
- [ ] Kicker labels present on every major marketing section

### Interaction & Animation
- [ ] All hover states fire correctly with correct transition durations
- [ ] Card hover lift: `translateY(-2px)`, `shadow-3`, `200ms ease`
- [ ] Primary CTA hover: `shadow: 0 4px 16px rgba(232,87,42,0.35)`, `scale(1.01)`
- [ ] Pricing featured card always at `translateY(-8px)`, elevated further on hover
- [ ] Page intro animation fires on first paint (hero only)
- [ ] Section reveals fire on scroll entry (not all at once on page load)
- [ ] Modal enter/exit animations correct (scale + fade)
- [ ] Toast enter/exit correct
- [ ] CTA pulse animation: only on final CTA section primary button

### Accessibility
- [ ] All interactive elements have visible `:focus-visible` styles
- [ ] Focus order is logical top-to-bottom, left-to-right
- [ ] All form inputs have explicit `<label>` elements (not placeholder-only)
- [ ] Error messages linked via `aria-describedby`
- [ ] Error messages in `role="alert"` or `aria-live="polite"`
- [ ] Auth forms have `autocomplete` attributes
- [ ] Color is never the only differentiator (delta arrows, error icons, success icons accompany color)
- [ ] All images have descriptive `alt` text; decorative images have `alt=""`
- [ ] Logo marquee has `aria-label` and is `aria-hidden` from screen readers (decorative)
- [ ] Sidebar nav items have `aria-current="page"` on active item
- [ ] Modal has `role="dialog"`, `aria-modal="true"`, focus trap active while open

### Performance Sanity
- [ ] No animation on `transform: all` — use specific property transitions
- [ ] Logo marquee uses CSS animation (not JS scroll)
- [ ] Images use `loading="lazy"` below the fold
- [ ] Hero media image has `loading="eager"` and defined `width`/`height`
- [ ] Font families loaded via `<link rel="preload">` for display and sans

### Reduced-Motion Compliance
- [ ] `@media (prefers-reduced-motion: reduce)` disables all keyframe animations
- [ ] Content revealed by IntersectionObserver remains visible even without animation
- [ ] Hover transitions still fire (color/shadow changes) — only `transform` is suppressed
- [ ] CTA pulse is suppressed
- [ ] Marquee stops scrolling (or is paused via `animation-play-state: paused`)

---

## 22. Definition of Done (Strict Contract)

This `design.md` is complete and valid for agent handoff when all of the following are true:

**Token Completeness**
- [x] Color tokens: all semantic and palette values with hex
- [x] Typography tokens: font families, full scale with clamp values, weight, line-height, letter-spacing
- [x] Spacing: section-gap clamp, container padding, grid gap
- [x] Radius: all component types covered
- [x] Shadow: 5-level scale with exact values, usage matrix, hover/rest/active
- [x] Animation: all named presets with exact duration/easing/delay
- [x] Interaction: hover/focus/active/disabled for all component families

**Auth Coverage**
- [x] All 4 flows specified: Sign In, Sign Up, Forgot Password, Reset Password
- [x] All interaction states: idle, focus, invalid, submitting, success, failure, locked
- [x] Field validation timing rules
- [x] Guard behavior: redirect, token validation, session expiry
- [x] Accessibility: focus order, aria, autocomplete

**Dashboard Coverage**
- [x] Layout blueprint with exact zone dimensions
- [x] First-screen modules: KPI, activity, tasks/alerts, quick actions
- [x] Data-dense patterns: table, filter, sort, pagination, bulk actions, side panel
- [x] Role/permission matrix: admin/member/viewer
- [x] Responsive behavior at all 4 breakpoints

**Marketing Coverage**
- [x] 3 named hero layout archetypes with grid ratios
- [x] Section cadence map (exact background per section, in order)
- [x] Accent color frequency rules (permitted + forbidden)
- [x] Font pairing rule with combination constraints
- [x] Card visual personality per recipe (not one-size-fits-all)
- [x] Display-scale typography rule with ambient typography spec
- [x] All component recipes with visual/hover/responsive behavior

**Implementation Readiness**
- [x] Route-level implementation checklist with no open decisions
- [x] Tailwind utility direction (prefer/avoid)
- [x] QA acceptance checklist covering visual/interaction/a11y/performance/reduced-motion
- [x] Two engineers would produce near-identical UIs from this document