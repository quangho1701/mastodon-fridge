# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mastodon Fridge is a mobile-first Expo/React Native app for Purdue Fort Wayne (PFW) students that digitizes the experience of a communal fridge door — students scan physical flyers with AI, pin events to a personal "fridge," and share photos/memories in event galleries. Phase 1 MVP focuses on 8 screens covering onboarding, home, scanning, confirmation, and discovery.

**Tech stack:** React Native (Expo ~54), TypeScript, Firebase Auth (planned), Claude Vision API (Anthropic, planned for backend).

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
- [App.tsx](mastodon-fridge/App.tsx) — Wraps `SafeAreaProvider` → `ThemeProvider` → `NavigationContainer` → `RootNavigator`
- [app.json](mastodon-fridge/app.json) — Expo config (fonts, splash, icon, native modules)
- [tsconfig.json](mastodon-fridge/tsconfig.json) — TypeScript config with `@/*` path alias

## Architecture

### Directory Structure

```
mastodon-fridge/src/
├── screens/           # Full-screen components, one file per route
├── components/        # Reusable UI; scanner/ market/ gallery/ sub-folders for feature-specific components
├── navigation/        # RootNavigator, TabNavigator, CustomTabBar
├── theme/             # Design system: colors, typography, spacing, shadows, ThemeContext
├── data/              # Seed data (fridgeSeed.ts — mock events/stickers)
└── assets/images/     # Mascot PNGs and other static images
```

### Navigation Stack

**RootNavigator** (`createNativeStackNavigator`) — `initialRouteName: "Onboarding"`:
- `Onboarding` → `EntryScreen` (5-slide horizontal carousel; navigates to `Entry` on finish or "Sign in")
- `Entry` → `EntryScreen` (auth landing)
- `MainTabs` → `TabNavigator` (`gestureEnabled: false`)
- `Confirm` → `ConfirmScreen` (params: `imageUri`, `extractedTitle`, `extractedDate`, `extractedStartDate`, `extractedEndDate`, `extractedLocation`)
- `EventGallery` → `EventGalleryScreen` (params: `eventId: string`)

**TabNavigator** (`createBottomTabNavigator`) with custom `CustomTabBar`:
`Fridge | Market | Scan | Friends | Profile`

The `RootStackParamList` type in [RootNavigator.tsx](mastodon-fridge/src/navigation/RootNavigator.tsx) is the source of truth for all navigation params.

### Design System

Located in [src/theme/](mastodon-fridge/src/theme/):

- [colors.ts](mastodon-fridge/src/theme/colors.ts) — Light/dark palette, Summit Gold (`#DAAA00`), Golden (`#CFB991`)
- [typography.ts](mastodon-fridge/src/theme/typography.ts) — Font sizes, weights, line heights (United Sans Cond + Acumin Pro via `expo-font`)
- [spacing.ts](mastodon-fridge/src/theme/spacing.ts) — 4px base unit system (4, 8, 12, 16, 20, 24, 32, 48px)
- [shadows.ts](mastodon-fridge/src/theme/shadows.ts) — Light mode shadows only; dark mode uses borders
- [ThemeContext.tsx](mastodon-fridge/src/theme/ThemeContext.tsx) — `useTheme()` hook returns `{ theme, toggleTheme }`

The theme barrel export is at `src/theme/index.ts`. Always import from `@/theme`, not individual files.

### Component Patterns

- **Screen-scoped sub-components** live in sub-folders: `components/scanner/`, `components/market/`, `components/gallery/`
- **Fridge surface objects**: `Magnet`, `MastodonMagnet`, `LetterMagnet`, `StickyNote`, `Polaroid`, `Sticker`, `CrumpledNote`, `PhotoCard`, `PinnedItem` — all render as fridge collage items
- **FridgeCollage** — masonry layout rendering fridge items inside `FridgeSurface` (stainless-steel texture background)
- **ScanScreen** freezes camera preview during extraction (`cameraRef.current.pausePreview()`) and resumes on unmount

### Installed Libraries

Only these are in `package.json` — do not assume `react-native-reanimated` or `react-native-gesture-handler` are available (they are **not** yet installed):

```
@react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs
expo-camera, expo-image-picker, expo-calendar, expo-blur, expo-linear-gradient, expo-font
react-native-svg, react-native-safe-area-context, react-native-screens, react-native-web
@expo/vector-icons
```

### Data & Mocking

[src/data/fridgeSeed.ts](mastodon-fridge/src/data/fridgeSeed.ts) provides mock event and sticker data. No real backend or auth is connected yet (Milestone 1+).

## Implementation Status

The codebase is at **Milestone 0 complete / Milestone 1 in progress**:
- Screens built: Onboarding (5-slide carousel), Entry, FridgeScreen, MarketScreen, ScanScreen, ConfirmScreen, EventGalleryScreen, FriendsScreen, ProfileScreen
- Navigation wired end-to-end; ScanScreen has camera + permission handling
- No auth, no backend API calls, no real data — all UI is mock/seed

Refer to [implementation-plan.md](implementation-plan.md) for milestone details and [UI_DEVELOPMENT_PLAN.md](UI_DEVELOPMENT_PLAN.md) for per-screen layout specs.

## Key Design Documents

- **DESIGN.md** — Color palette, typography, spacing, component styles, motion guidelines, brand voice.
- **UI_DEVELOPMENT_PLAN.md** — Source of truth for Phase 1 UI: 8 screens with user flows, layouts, interactions.
- **implementation-plan.md** — Phased milestones (0–9) with task checklists and database schema.
- **PRD.md** — Product requirements including MoSCoW priority and NFR targets.

## Architecture Notes

- **Personal Fridge (FridgeScreen):** Organic 3-column collage — absolute positioning or custom layout, NOT a FlatList grid. Items have slight random rotation (±3°).
- **AI Scanner (ScanScreen → ConfirmScreen):** Camera capture → compress → POST to backend `/api/extract` (Claude Vision) → editable confirmation form. Backend not yet built.
- **Sticker System:** Core UX — magnets, polaroids, sticky notes are draggable objects placed on the fridge surface.
- **Theming:** Light mode uses shadows for depth; dark mode uses borders only. Always use `useTheme()` — never hardcode dark/light logic.
- **Fonts:** `UnitedSansCond-Bold` (headings) and `AcuminPro-Regular` / `AcuminPro-Semibold` loaded via `expo-font` plugin in app.json. Use these exact family strings in StyleSheet.

## Brand Rules

- "Dons" is acceptable wherever a playful, student-native register fits (welcome copy, empty states, marketing). Reserve "Mastodons" for official/identity moments.
- Prefer "we" in community-oriented microcopy, but it's a soft preference, not a strict rule.
- Summit Gold (`#DAAA00`) is the action/interactive color; Golden (`#CFB991`) is for brand identity moments only.
- Minimum touch target: 44×44px.

## UI/UX Skill — Mandatory

For **any** UI/UX work (new screen, component, design decision, layout, color, spacing), you **must** run the skill first before planning or writing code:

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system -p "Project Name"
```

Do not substitute reading the skill docs for actually running the script. The script queries the design database and returns concrete recommendations.

## TypeScript & Linting

- `npm run lint` runs `tsc --noEmit` (type check only; no files emitted)
- Strict mode enabled; all components must be typed
- Use path alias `@/*` in imports (e.g., `import { useTheme } from '@/theme'`)
- Screen props should use `NativeStackScreenProps<RootStackParamList, 'ScreenName'>` from `@react-navigation/native-stack`
