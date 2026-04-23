# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mastodon Fridge is a mobile-first Expo/React Native app for Purdue Fort Wayne (PFW) students that digitizes the experience of a communal fridge door — students scan physical flyers with AI, pin events to a personal "fridge," and share photos/memories in event galleries. Phase 1 MVP focuses on 8 screens covering onboarding, home, scanning, confirmation, and discovery.

**Tech stack:** React Native (Expo), TypeScript, Firebase Auth, Claude Vision API (Anthropic).

## Development Commands

All commands run from `mastodon-fridge/` directory.

```bash
npm start              # Launch Expo dev server; opens interactive menu to run on iOS/Android/web
npm run android        # Start Android emulator build
npm run ios           # Start iOS simulator build
npm run web           # Start web build (http://localhost:19006)
npm run lint          # Type check via TypeScript (tsc --noEmit)
npm test              # Currently a no-op placeholder
```

**Key files:**
- [index.ts](mastodon-fridge/index.ts) — Expo root entry point
- [App.tsx](mastodon-fridge/App.tsx) — Main component (navigation setup)
- [app.json](mastodon-fridge/app.json) — Expo config (fonts, splash, icon, native modules)
- [tsconfig.json](mastodon-fridge/tsconfig.json) — TypeScript config with `@/*` path alias

## Architecture

### Directory Structure

```
mastodon-fridge/src/
├── screens/           # Full-screen components (EntryScreen, FridgeScreen, ScanScreen, etc.)
├── components/        # Reusable UI: FridgeCollage, Magnet, Polaroid, StickyNote, FlyerCard, etc.
├── navigation/        # React Navigation setup: RootNavigator, TabNavigator, CustomTabBar
├── theme/             # Design system: colors, typography, spacing, shadows, ThemeContext
└── data/              # Seed data (e.g., fridgeSeed.ts for mock event/sticker data)
```

### Navigation

- **RootNavigator** — Stack navigator for root-level auth flow (Entry screen vs. authenticated app)
- **TabNavigator** — Bottom tab navigation (Fridge, Market, Center [+] action, Friends, Profile)
- **CustomTabBar** — Custom tab bar component with protruding center button at specified height

### Design System

Located in [src/theme/](mastodon-fridge/src/theme/):

- [colors.ts](mastodon-fridge/src/theme/colors.ts) — Light/dark palette, Summit Gold (`#DAAA00`), Golden (`#CFB991`)
- [typography.ts](mastodon-fridge/src/theme/typography.ts) — Font sizes, weights, line heights (United Sans Cond + Acumin Pro via `expo-font`)
- [spacing.ts](mastodon-fridge/src/theme/spacing.ts) — 4px base unit system (4, 8, 12, 16, 20, 24, 32, 48px)
- [shadows.ts](mastodon-fridge/src/theme/shadows.ts) — Light mode shadows only; dark mode uses borders
- [ThemeContext.tsx](mastodon-fridge/src/theme/ThemeContext.tsx) — Provides theme state and toggle function

### Key Components

- **FridgeCollage** — 3-column masonry layout rendering fridge items (magnets, polaroids, stickers)
- **FridgeSurface** — Stainless-steel texture background container with FridgeCollage
- **Magnet/MastodonMagnet/StickyNote/Polaroid/Sticker** — Individual fridge object types
- **FlyerCard** — Display scanned flyer or event card in lists
- **CustomTabBar** — Bottom navigation with 44px minimum touch targets

### Data & Mocking

[src/data/fridgeSeed.ts](mastodon-fridge/src/data/fridgeSeed.ts) provides mock event and sticker data for development. Replace with backend API calls during Milestone 1 (auth integration).

## Key Design Documents

- **DESIGN.md** — Mobile design system: color palette, typography, spacing, component styles, motion guidelines, brand voice rules.
- **UI_DEVELOPMENT_PLAN.md** — Source of truth for Phase 1 UI: 8 screens with user flows, layouts, interactions.
- **implementation-plan.md** — Phased approach: Milestone 0 (scaffolding, theme), Milestone 1 (auth), Milestone 2 (AI scanning), Milestone 3 (calendar + stickers), Milestone 4+ (gallery, community features).

## Architecture Notes

- **Personal Fridge (Screen 2):** Organic 3-column collage layout on stainless-steel texture background (not grid/list).
- **Bottom Navigation:** 5 sections with protruding center [+] action button (special CustomTabBar component).
- **AI Scanner (Screen 3):** Camera viewfinder with glowing scan frame; capture/compress image, send to Claude Vision API backend endpoint, extract event JSON, display editable confirmation form.
- **Sticker System:** Core UX mechanic — magnets, polaroids, sticky notes, stickers are interactive objects users place/drag on fridge surface.
- **Theming:** Light mode uses shadows for depth; dark mode uses borders only (no shadows). Enforce via theme context.
- **Fonts:** United Sans Cond (headings) and Acumin Pro (body) loaded via `expo-font` plugin (see app.json).

## Brand Rules

- Prefer "we" in community-oriented microcopy, but it's a soft preference, not a strict rule.
- "Dons" is acceptable wherever a playful, student-native register fits (welcome copy, empty states, marketing). Reserve "Mastodons" for official/identity moments.
- Summit Gold (`#DAAA00`) is the action/interactive color; Golden (`#CFB991`) is for brand identity moments only.
- Minimum touch target: 44x44px.

## UI/UX Skill — Mandatory

For **any** UI/UX work (new screen, component, design decision, layout, color, spacing), you **must** run the skill first before planning or writing code:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system -p "Project Name"
```

Do not substitute reading the skill docs for actually running the script. The script queries the design database and returns concrete recommendations.

## TypeScript & Linting

- `npm run lint` runs `tsc --noEmit` (type check only; no files emitted)
- Strict mode enabled; all components should be typed
- Use path alias `@/*` in imports (e.g., `import Button from '@/components/Button'`)
