# Implementation Plan: Mastodon Fridge — Phase 1 MVP

> **Version:** 1.0
> **Date:** 2026-04-16
> **Scope:** Phase 1 MVP as defined in PRD.md

---

## Tech Stack Decision (Prerequisite)

Before writing any code, lock these decisions:

| Layer | Recommendation | Rationale |
|:---|:---|:---|
| **Framework** | **React Native (Expo)** | Faster iteration with Expo's managed workflow; good camera/calendar APIs via community libraries; large ecosystem for masonry layouts, drag-and-drop, animations |
| **Backend** | **Node.js (Express or Fastify) + PostgreSQL** | Matches PRD spec; strong ORM support (Prisma); easy to deploy |
| **Storage** | **Firebase Storage** or **AWS S3 + CloudFront CDN** | Both work; Firebase is simpler to start, S3 scales better |
| **Auth** | **Firebase Auth** with Google OAuth (restricted to `@pfw.edu` domain) | Handles OAuth flow, session persistence, email domain filtering |
| **AI** | **Claude Vision API** (Anthropic) | Multimodal extraction from flyer images; structured JSON output |
| **State Management** | **Zustand** or **React Query** (TanStack Query) | Zustand for client state, React Query for server state/caching |

---

## Milestone 0: Project Scaffolding (Days 1–3)

**Goal:** A running app shell with navigation, theming, and CI.

- [ ] Initialize Expo project (`npx create-expo-app mastodon-fridge`)
- [ ] Set up TypeScript configuration
- [ ] Install and configure **React Navigation** (bottom tabs + stack navigators)
- [ ] Build the bottom tab bar with 5 sections: Fridge, Market, [+], Friends (placeholder), Profile
  - The center [+] button gets special styling: protruding white circle with blue plus, circular cutout
- [ ] Implement the **design system** as a theme provider:
  - Color tokens (light/dark) from DESIGN.md
  - Typography scale (United Sans Cond + Acumin Pro — load via `expo-font`)
  - Spacing constants (4px base unit, 16px margins, 12px card gap, etc.)
  - Reusable component primitives: `MagnetButton`, `FlyerCard`, `StickyNote`
- [ ] Set up backend repo: Express/Fastify + Prisma + PostgreSQL
- [ ] Create initial database schema (see below)
- [ ] Set up CI (GitHub Actions: lint, type-check, test)

### Database Schema (core tables)

```sql
users         (id, email, display_name, avatar_url, created_at)
events        (id, title, date, start_time, end_time, location, description,
               organizer, flyer_image_url, scanned_by_user_id, created_at)
fridge_items  (id, user_id, event_id, sticker_type, sticker_id, created_at)
gallery_media (id, event_id, uploaded_by_user_id, media_url, media_type, created_at)
stickers      (id, media_item_id, placed_by_user_id, sticker_type, x_pos, y_pos, created_at)
```

---

## Milestone 1: Authentication (Days 4–7)

**Goal:** Users can sign in with `@pfw.edu` email and land on a skeleton home screen.

- [ ] **Screen 1 — Entry Point**: Brushed steel background texture, centered logo, "Sign in with University Email" button
- [ ] Integrate Firebase Auth with Google OAuth provider
- [ ] Enforce `@pfw.edu` domain restriction server-side (reject non-PFW emails with clear error: "Mastodon Fridge is for PFW students only")
- [ ] Implement session persistence (FR-1.5) — auto-login on app restart
- [ ] Backend: `/auth/verify` endpoint to create/fetch user record from Firebase token
- [ ] After auth, navigate to Personal Fridge (empty state for now)
- [ ] (Should Have) Brief 3-screen onboarding carousel explaining the fridge metaphor

**Key risk:** PFW's identity provider may not support standard Google OAuth. Research this first. Fallback: email verification flow (send a code to `@pfw.edu` address).

---

## Milestone 2: AI Magic Lens — Scan & Extract (Days 8–14)

**Goal:** Users can scan a physical flyer and get structured event data back.

- [ ] **Screen 3 — Magic Lens**: Camera viewfinder using `expo-camera`
  - Centered glowing square scanning frame overlay
  - Shutter button, flash toggle, "Upload from Gallery" button (via `expo-image-picker`)
- [ ] On capture: compress image to max 2048px longest edge
- [ ] Backend: `/api/extract` endpoint
  - Receives image (base64 or multipart)
  - Calls Claude Vision API with the structured extraction prompt from PRD Section FR-2
  - Returns JSON: `{ event_title, date, start_time, end_time, location, description, organizer }`
- [ ] (Should Have) Real-time bounding box overlay while camera focuses (this is complex — consider deferring to polish phase and using a simulated "scanning" animation instead)
- [ ] Display extraction results in an editable confirmation form
  - Pre-fill all fields; highlight `null` required fields in Summit Gold
  - User can manually correct any field (FR-2.5)
- [ ] Store the flyer image in cloud storage; save event record to database
- [ ] Handle errors gracefully: network failure, API timeout, low-confidence extraction all fall back to manual entry

**Latency target:** < 3s on Wi-Fi. Show a Mastodon footprint loading animation during extraction.

---

## Milestone 3: Calendar Integration & Sticker Workshop (Days 15–20)

**Goal:** After extraction, users sync to their native calendar and pick a sticker.

- [ ] **Screen 4A — Calendar Handoff**:
  - Use `expo-calendar` to request calendar permissions
  - Open the native calendar sheet pre-filled with extracted data (title, date, times, location)
  - Detect when user returns from native calendar flow
- [ ] (Should Have) Calendar conflict detection: query existing events via `expo-calendar`, show warning overlay if time overlaps
- [ ] (Should Have) "Skip calendar, just add to Fridge?" option if user cancels the calendar sheet
- [ ] **Screen 4B — Sticker Workshop Modal**:
  - Frosted glass backdrop blur
  - Scrollable categorized grid: Magnets, Stickers, Buttons, Emojis
  - Tap to select → live preview showing sticker "pinning" to the flyer thumbnail
  - "Add to Fridge" button commits the selection
  - (Could Have) "Click" sound effect on commit via `expo-av`
- [ ] Backend: `POST /api/fridge-items` — saves user's fridge item (event + sticker choice)
- [ ] On commit: navigate to Personal Fridge with the new item visible

### Asset Requirement

You'll need sticker/magnet artwork. Use a mix of:
- Free 3D icon packs (for magnets/buttons)
- Custom SVG illustrations (for themed stickers)
- System emoji (for the quick emoji section)

---

## Milestone 4: Personal Fridge — Home Dashboard (Days 21–28)

**Goal:** The hero screen. A tactile, physical-feeling fridge door.

This is the hardest UI screen and the product's identity. Invest the most time here.

- [ ] **Screen 2 — Personal Fridge**:
  - **Background:** High-res brushed stainless steel texture (tile a seamless texture image)
  - **Header:** "[User's Name]'s Fridge" left-aligned, settings gear icon right-aligned
  - **Organic 3-column collage layout:**
    - NOT a standard FlatList grid. Use absolute positioning or a custom layout engine
    - Items have slight random rotation (±3°), varied sizes, and organic spacing
    - Each item is a composite: flyer thumbnail (polaroid style with white border) + chosen sticker/magnet positioned as if "holding" the photo
  - **Item types rendered differently:**
    - Polaroids: thick white border, slight tilt, drop shadow
    - Magnets: 3D-rendered appearance, cast shadow onto the steel
    - Sticky notes: yellow background, slight bottom-edge curl, handwritten-style font
  - **Shadows:** Soft realistic drop shadows in light mode; border-only in dark mode
  - **Scrolling:** Vertical `ScrollView` for many items
- [ ] **Empty state:** "Nothing here yet. Your next step starts now." with a prompt pointing to the [+] button
- [ ] Tap any item → navigate to Event Interior (Screen 6)
- [ ] (Should Have) Long-press context menu: "Remove from Fridge," "Change Sticker," "Share"
- [ ] (Should Have) Upcoming events visually prominent; past events faded/desaturated
- [ ] Backend: `GET /api/fridge-items?user_id=X` — returns user's fridge items with event data and sticker info

### Implementation Approach for the Collage Layout

1. Pre-compute positions on the server or client using a packing algorithm
2. Each item gets `{ x, y, width, height, rotation }` values
3. Render with `Animated.View` using absolute positioning inside a `ScrollView`
4. Alternatively, use a masonry library and add random rotation transforms

---

## Milestone 5: Community Market (Days 29–34)

**Goal:** University-wide discovery feed of all scanned flyers.

- [ ] **Screen 5 — Community Market**:
  - Search bar at top (keyword search: title, description, location)
  - Pinterest-style masonry grid using a library like `react-native-masonry-list`
  - Each card: flyer image, event title, date, "Quick Pin" magnet icon in corner
  - Infinite scroll with lazy image loading
- [ ] **Quick Pin** action: tap the magnet icon → triggers calendar sheet → sticker workshop → adds to fridge (reuse the flow from Milestone 3)
- [ ] Backend:
  - `GET /api/events?search=X&sort=recent&page=N` — paginated feed with search
  - Events auto-enter the Market when any user scans a flyer (this already happens from Milestone 2)
- [ ] (Should Have) Sort options: "Recent," "Trending," "This Week"
- [ ] (Should Have) Duplicate merging: group events by fuzzy title + date match, show "Scanned by X students" badge
- [ ] Progressive image loading: show blurred low-res placeholder → load full image

---

## Milestone 6: Event Interior & Media View (Days 35–42)

**Goal:** Shared photo/video galleries for each event.

- [ ] **Screen 6 — Event Interior**:
  - Header: event title (bold, H1), minimized flyer image in corner
  - Vertical feed of photos/videos uploaded by attendees
  - Each media item shows: the image, any stickers/sticky-notes overlaid on it, uploader attribution
  - Camera/upload button at bottom to contribute media (`expo-image-picker`)
  - Media uploads go to cloud storage; metadata saved to `gallery_media` table
- [ ] **Screen 7 — Media & Sticker View** (full-screen):
  - Photo/video fills the screen
  - Pull-up sticker tray at bottom (emoji, PFW icons, colored sticky notes)
  - **Drag-and-drop**: user drags sticker from tray and drops anywhere on the photo
    - Use `react-native-gesture-handler` + `react-native-reanimated` for 60fps drag
    - On drop: save sticker position (x%, y%) to the `stickers` table
    - All placed stickers are visible to every viewer
  - Attribution "Post-it" at bottom showing who posted the media
- [ ] Backend:
  - `GET /api/events/:id/gallery` — paginated gallery media with sticker overlays
  - `POST /api/gallery/:mediaId/stickers` — place a sticker
  - `POST /api/events/:id/upload` — upload media (handle image compression, generate thumbnail)
- [ ] (NFR) Image optimization: serve adaptive sizes (1x/2x/3x), lazy load below fold, video thumbnails with play icon

---

## Milestone 7: Profile & Settings (Days 43–46)

**Goal:** Account management baseline.

- [ ] **Screen 8 — The Pantry**:
  - User avatar + display name (editable)
  - Stats cards: "X Events Attended," "Y Flyers Scanned," "Z Memories Saved"
  - (Should Have) Default calendar selection preference
  - (Should Have) Notification toggles
  - (Should Have) Privacy toggle: "Public to Campus" vs. "Friends Only" fridge
  - Sign out button
  - Account deletion option (triggers 30-day data deletion pipeline per NFR-4.6)
- [ ] Backend: `GET /api/users/:id/stats`, `PATCH /api/users/:id/settings`

---

## Milestone 8: Polish, Performance & Quality (Days 47–55)

**Goal:** Meet NFR targets and ship-ready quality.

- [ ] **Performance:**
  - Cold start < 2s: optimize bundle, defer non-critical imports
  - Gallery scroll at 60fps: verify with React Native performance monitor
  - Memory management: offscreen images released; cap at 200MB in-memory
  - CDN caching for all media assets
- [ ] **Content moderation:** Integrate a moderation API (or simple NSFW detection) on media upload before gallery publication
- [ ] **Offline support:** Cache Personal Fridge data locally (AsyncStorage or MMKV); show cached data when offline; queue scanner operations for when connectivity returns
- [ ] **Accessibility:** Verify all touch targets >= 44px; add accessible labels to all interactive elements; test with VoiceOver/TalkBack; verify WCAG AA color contrast
- [ ] **Reduced motion:** Respect system setting; disable parallax/spring animations when enabled
- [ ] **Error states:** Network errors, empty states, permission denials all have graceful UI with brand-voice microcopy
- [ ] **Dark mode** (Could Have): Implement if time permits; the design system already defines all tokens
- [ ] **Crash reporting:** Integrate Sentry
- [ ] **Analytics:** Integrate an analytics SDK to track the KPIs from PRD Section 10

---

## Milestone 9: Testing & Launch Prep (Days 56–62)

- [ ] End-to-end test of all user journeys:
  - Morning flow (open app → check fridge → tap event → see gallery)
  - Midday flow (scan flyer → calendar sync → sticker → fridge)
  - Sunday reflection (browse past events → view gallery → place sticker)
- [ ] Test on real devices: iOS 16+ (iPhone 12 minimum) and Android API 28+ (Pixel 4a, Samsung mid-range)
- [ ] Test with real PFW flyers (collect 20+ varied samples: different layouts, handwritten, multi-event)
- [ ] Verify AI extraction accuracy target: > 85% without manual correction
- [ ] Load test backend: simulate 5,000 concurrent users
- [ ] Security audit: TLS 1.3, no API keys in client bundle, rate limiting on AI extraction endpoint (20 scans/user/day)
- [ ] App Store / Play Store submission prep: screenshots, description, privacy policy

---

## Critical Path & Dependencies

```
Milestone 0 (Scaffolding)
    ├── Milestone 1 (Auth) ─────────────────────┐
    │       └── Milestone 2 (AI Scanner) ────────┤
    │               └── Milestone 3 (Calendar +  │
    │                    Sticker Workshop) ───────┤
    │                       └── Milestone 4       │
    │                          (Personal Fridge)──┤
    │                              │              │
    │                       Milestone 5 ──────────┤
    │                       (Community Market)    │
    │                              │              │
    │                       Milestone 6 ──────────┘
    │                       (Galleries)
    │                              │
    │                       Milestone 7 (Profile)
    │                              │
    └───────────────────────Milestone 8 (Polish)
                                   │
                            Milestone 9 (Launch)
```

Milestones 4, 5, and 7 can be parallelized if you have multiple developers. Milestones 2→3→4 are the core sequential chain.

---

## What to Build First vs. What to Skip

### Build first (highest risk, highest value)

1. **The AI extraction pipeline** — this is the core value prop. Validate accuracy early with real flyers.
2. **The Personal Fridge collage layout** — this is the product identity. If this doesn't feel tactile and delightful, nothing else matters.
3. **The scan→calendar→sticker→fridge flow end-to-end** — this is the complete "aha moment."

### Explicitly skip for Phase 1 (per PRD MoSCoW)

- Friends list / social graph (placeholder tab is fine)
- Direct messaging
- Event creation without a flyer
- Push notifications (in-app only)
- In-app video recording
- Gamification / badges
