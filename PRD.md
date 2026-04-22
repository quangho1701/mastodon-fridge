# Product Requirements Document: Mastodon Fridge

> **Version:** 1.0 (Phase 1 MVP)
> **Date:** 2026-04-16
> **Authors:** Product & Engineering Leadership


---

## Table of Contents

1. [Product Vision & Problem Statement](#1-product-vision--problem-statement)
2. [Target Users & Personas](#2-target-users--personas)
3. [Platform & Tech Stack](#3-platform--tech-stack)
4. [UI/UX Architecture (Phase 1)](#4-uiux-architecture-phase-1)
5. [Detailed User Journeys](#5-detailed-user-journeys)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Design System Compliance](#8-design-system-compliance)
9. [Feature Prioritization (MoSCoW)](#9-feature-prioritization-moscow)
10. [Success Metrics & KPIs](#10-success-metrics--kpis)
11. [Risks & Mitigations](#11-risks--mitigations)
12. [Appendix](#appendix)

---

## 1. Product Vision & Problem Statement

### Vision

A digital "fridge door" where Purdue Fort Wayne students magnetize physical campus flyers into their digital calendars and transform events into collaborative, shared memory galleries. Mastodon Fridge replaces the disposable flyer experience with a persistent, social, and deeply personal artifact of campus life.

### Problem Statement

University events suffer from two compounding problems:

1. **Administrative Friction:** Students encounter flyers in hallways, dining halls, and bulletin boards but must manually type event details into their calendars. This friction causes the majority of "interested" students to never follow through. The gap between physical discovery and digital commitment is where attendance dies.

2. **Social Fragmentation:** When students do attend events, the photos, videos, and memories generated are scattered across private Instagram stories (gone in 24 hours), iMessage group chats (unsearchable), and Snapchat (ephemeral by design). There is no shared, persistent, event-scoped space where attendees can collectively own a memory.

### Key Value Proposition

Bridge the gap between **physical discovery** (flyers on a wall) and **digital memory** (shared galleries tied to calendar events) using multimodal AI for instant extraction and a tactile, physically-inspired UI that makes the digital experience feel as personal as a real fridge door.

### Why Now

- Multimodal LLMs have reached the accuracy threshold required for reliable flyer text extraction without custom OCR pipelines.
- Cross-platform frameworks (React Native / Flutter) now deliver native-quality animations and camera performance.
- Gen-Z students increasingly prefer niche, community-scoped platforms over broad social networks.

---

## 2. Target Users & Personas

### Primary Audience

Undergraduate and graduate students at Purdue University Fort Wayne (PFW). Phase 1 is scoped exclusively to PFW; campus-specific features (calendar integration, community market) rely on a shared institutional context.

### Persona 1: The Social Butterfly — "Alex"

| Attribute | Detail |
| :--- | :--- |
| **Year** | Sophomore, Communications major |
| **Behavior** | Attends 3-5 events per week; always looking for what's happening next |
| **Pain Point** | Sees flyers everywhere but forgets to add them to his calendar; photos from events are lost in group chats |
| **Goal** | A single place to capture events instantly and relive memories later |
| **App Value** | AI scan eliminates typing; the Personal Fridge becomes his semester trophy case |

### Persona 2: The Student Organizer — "Maya"

| Attribute | Detail |
| :--- | :--- |
| **Year** | Junior, Biology major, VP of Pre-Med Society |
| **Behavior** | Creates and distributes 2-3 flyers per month; needs maximum reach with minimal effort |
| **Pain Point** | Prints 50 flyers, posts them around campus, but has no way to measure reach or engagement |
| **Goal** | Amplify flyer reach digitally without managing yet another social media account |
| **App Value** | When any student scans her flyer, it enters the Community Market automatically — organic distribution without extra work |

### Persona 3: The Quiet Observer — "Jordan"

| Attribute | Detail |
| :--- | :--- |
| **Year** | Freshman, Computer Science major |
| **Behavior** | Interested in campus life but intimidated by large social events; prefers low-commitment exploration |
| **Pain Point** | Doesn't know what events exist; finds out about things after they happen |
| **Goal** | Browse what's happening without social pressure to commit publicly |
| **App Value** | The Community Market lets Jordan discover events passively; pinning to the Personal Fridge is private; attending and contributing photos is optional |

### Persona 4: The Nostalgic Documenter — "Priya"

| Attribute | Detail |
| :--- | :--- |
| **Year** | Senior, Graphic Design major |
| **Behavior** | Takes photos at every event; values curation and aesthetic presentation |
| **Pain Point** | Her best campus photos are buried in a camera roll with 10,000 other images |
| **Goal** | A dedicated space to upload, organize, and revisit event photos with context |
| **App Value** | Event galleries are persistent, shared, and tied to specific moments — her photos become part of a collective memory, not just her camera roll |

---

## 3. Platform & Tech Stack

### Target Platforms

- **iOS:** 16.0+
- **Android:** API 28+ (Android 9.0 Pie)
- **Framework:** Cross-platform (React Native or Flutter — to be determined in technical spike)

### Core Technology Requirements

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **AI Flyer Extraction** | Multimodal LLM (e.g., Claude Vision API) | Extract structured event data (title, date, time, location, description) from photographed flyers with high accuracy across varied designs |
| **Calendar Integration** | Native iOS EventKit / Android CalendarProvider | Trigger the system calendar sheet pre-filled with extracted data; respect user's existing calendar ecosystem |
| **Real-time Media Storage** | Cloud object storage (e.g., AWS S3 / Firebase Storage) + CDN | Support high-volume photo/video uploads with low-latency retrieval for gallery feeds |
| **Backend** | Node.js or Python API server + PostgreSQL | User accounts, event metadata, gallery associations, social graph |
| **Authentication** | OAuth 2.0 with university email domain restriction (`@pfw.edu`) | Ensure verified campus community; single sign-on convenience |
| **Push Notifications** | Firebase Cloud Messaging (FCM) / APNs | Event reminders, friend activity, gallery updates |

---

## 4. UI/UX Architecture (Phase 1)

> Full screen specifications are defined in `UI_DEVELOPMENT_PLAN.md`. This section summarizes the screen map and navigation architecture.

### Screen Map

| # | Screen | Purpose | Entry Point |
| :--- | :--- | :--- | :--- |
| 1 | **Entry Point** | Authentication & welcome | App launch (unauthenticated) |
| 2 | **Personal Fridge** | Home dashboard — the user's digital fridge door | Default tab after auth |
| 3 | **AI Magic Lens** | Camera scanner for physical flyers | Center [+] button in bottom nav |
| 4 | **Confirmation & Sticker Workshop** | Calendar sync + sticker selection | Post-scan flow |
| 5 | **Community Market** | University-wide discovery feed | "Market" tab in bottom nav |
| 6 | **Event Interior** | Public gallery for a specific event | Tap any magnet on Fridge or Market |
| 7 | **Media & Sticker View** | Full-screen photo/video with sticker interaction | Tap media in Event Interior |
| 8 | **The Pantry** | Profile, stats, and settings | "Profile" tab in bottom nav |

### Navigation Architecture

- **Bottom Navigation Bar:** 5 sections — Fridge (Home), Market (Discovery), [+] Action, Friends, Profile.
- **Center [+] Button:** Prominent white circle with bold blue plus sign in a circular cutout that protrudes above the nav bar. This is the primary call-to-action for the entire app.
- **Nav Bar Style:** Translucent "frosted glass" blur effect at the bottom of every main screen.
- **Transition Model:** Standard push navigation for drill-down (Fridge -> Event Interior -> Media View). Modal presentation for the scanner flow and sticker workshop.

### Aesthetic Mandate

The UI must feel **tactile and physically inspired**. This is not a standard flat app. Every element on the fridge surface must behave like a physical object:

- Items cast soft, realistic drop shadows onto the metal background (light mode) or sit on bordered surfaces (dark mode).
- Photos appear as polaroids with thick white borders, slightly tilted.
- Magnets are rendered as realistic 3D objects.
- Sticky notes have a slight curl at the bottom edge.
- The layout is an organic, slightly "messy" 3-column collage — not a rigid grid.

---

## 5. Detailed User Journeys

### Journey 1: The Morning Flow — Daily Check-in

**Persona:** Alex (Social Butterfly)
**Time:** 7:30 AM, over coffee

| Step | Action | System Response | Emotional Outcome |
| :--- | :--- | :--- | :--- |
| 1 | Alex opens Mastodon Fridge | Personal Fridge loads with today's pinned events highlighted | Immediate orientation — "what's happening today?" |
| 2 | He spots a "Math Club Study Session" magnet pinned for 4:00 PM | The magnet is visually prominent among his fridge items | Recognition — the event feels real and committed |
| 3 | He taps the magnet | Event Interior opens; a sticky note from a friend says "Bringing donuts today!" | Belonging and social proof — the event is worth attending |
| 4 | He closes the app | No action needed | Alex starts his day feeling connected to campus |

### Journey 2: The Midday Flow — Capture & Commit

**Persona:** Alex (Social Butterfly)
**Time:** 12:15 PM, walking through Kettler Hall

| Step | Action | System Response | Emotional Outcome |
| :--- | :--- | :--- | :--- |
| 1 | Alex spots a flyer for "Theater Staged Reading" at Williams Theatre | — | Curiosity — but he'll forget if he doesn't act now |
| 2 | He hits the [+] button | AI Magic Lens opens; camera viewfinder activates | Agency — capturing takes 2 seconds |
| 3 | He points the camera at the flyer | Bounding boxes appear in real time over event name, time, location | Trust — the AI is visibly "reading" the flyer |
| 4 | He taps "Add to Calendar" | Native calendar sheet slides up, pre-filled with extracted data | Delight — zero typing required |
| 5 | System detects conflict: "You have Linear Algebra at that time; add anyway?" | Conflict alert overlay | Informed choice — the app respects his time |
| 6 | He taps "Yes" and the native "Add" button | Event syncs to Google Calendar; "Choose your sticker?" modal appears | Commitment locked in |
| 7 | He selects a theater mask sticker | Live preview shows the sticker pinning to a polaroid of the flyer | Personal expression — this is *his* item on *his* fridge |
| 8 | He taps "Add to Fridge" | Satisfying "click" sound; redirect to Personal Fridge with new item | Pride of ownership |
| 9 | The flyer goes live in Community Market | Other students can discover the event | Contribution — Alex helped his community |

### Journey 3: The Sunday Reflection

**Persona:** Alex / Priya (Nostalgic Documenter)
**Time:** Sunday evening, winding down

| Step | Action | System Response | Emotional Outcome |
| :--- | :--- | :--- | :--- |
| 1 | Scrolls through "Past Events" on the fridge | Faded/archived magnets are still visible | The fridge is a living history, not just a calendar |
| 2 | Taps the "AI Hackathon" magnet from Friday | Event Interior opens with 50+ photos/videos from 20 attendees | Surprise — the event was bigger than she remembered |
| 3 | Finds a video of herself presenting — filmed by someone else | Video plays full-screen in Media View | Genuine delight — a memory she didn't know existed |
| 4 | Leaves a "Gold Star" sticker on the video | Sticker animates onto the video; visible to all gallery viewers | Pride — her fridge is now a trophy case |

---

## 6. Functional Requirements

### FR-1: Authentication & Onboarding

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-1.1 | Users authenticate via OAuth 2.0 using their `@pfw.edu` university email | Must |
| FR-1.2 | Non-PFW email domains are rejected with a clear error message | Must |
| FR-1.3 | First-time users see a brief onboarding flow (max 3 screens) explaining the fridge metaphor | Should |
| FR-1.4 | Users can set a display name and optional profile photo during onboarding | Should |
| FR-1.5 | Session tokens persist across app restarts (no re-login required unless explicitly signed out) | Must |

### FR-2: AI Flyer Extraction (Magic Lens)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-2.1 | The camera viewfinder opens with a centered scanning frame (glowing square overlay) | Must |
| FR-2.2 | Real-time bounding boxes appear over detected text regions (event name, date/time, location) as the camera focuses | Must |
| FR-2.3 | The system extracts structured data fields: **Event Title**, **Date**, **Start Time**, **End Time** (if present), **Location**, and **Description** (if present) | Must |
| FR-2.4 | Extraction uses a multimodal LLM API call with the captured image; the model returns structured JSON | Must |
| FR-2.5 | If extraction confidence is below threshold, the user is prompted to manually correct fields before proceeding | Must |
| FR-2.6 | Users can upload an image from their photo gallery instead of using the live camera | Must |
| FR-2.7 | Flash toggle is available in the camera UI | Should |
| FR-2.8 | The system handles common flyer formats: portrait/landscape orientation, varied typography, hand-drawn elements, multi-event flyers | Should |
| FR-2.9 | Extraction latency target: structured data returned within 3 seconds of capture on a stable connection | Must |

**AI Extraction Logic (Detail):**

The extraction pipeline follows this sequence:

1. **Image Capture:** User takes a photo or selects from gallery. Image is compressed to max 2048px on the longest edge (quality/size tradeoff for API latency).
2. **API Call:** The image is sent to a multimodal LLM endpoint (e.g., Claude Vision) with a structured prompt requesting JSON output:
   ```
   Extract the following fields from this event flyer image:
   - event_title (string, required)
   - date (ISO 8601, required)
   - start_time (HH:MM, required)
   - end_time (HH:MM, optional)
   - location (string, required)
   - description (string, optional)
   - organizer (string, optional)
   Return JSON only. If a field cannot be determined, set it to null.
   ```
3. **Confidence Handling:** If any required field is `null`, the app presents an editable form pre-filled with whatever was extracted, highlighting missing fields in Summit Gold (`#DAAA00`).
4. **Calendar Handoff:** Validated data is passed to the native calendar API.

### FR-3: Calendar Integration

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-3.1 | After extraction confirmation, the app triggers the native system calendar sheet (iOS EventKit / Android Intent) pre-filled with extracted data | Must |
| FR-3.2 | The user can select which calendar to add the event to (e.g., "School" vs. "Personal") | Must (native behavior) |
| FR-3.3 | The user can set reminders/alerts using the native calendar UI | Must (native behavior) |
| FR-3.4 | Calendar conflict detection: if the extracted time overlaps with an existing calendar event, display a warning before the native sheet opens | Should |
| FR-3.5 | After the user taps the native "Add" button, control returns to the app and the sticker selection flow begins | Must |
| FR-3.6 | If the user cancels the native calendar sheet, the app offers "Skip calendar, just add to Fridge?" | Should |

### FR-4: Personal Fridge (Home Dashboard)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-4.1 | The fridge surface displays the user's pinned events as interactive objects (magnets, polaroids, sticky notes, stickers) in an organic 3-column collage layout | Must |
| FR-4.2 | Each item casts a soft, realistic drop shadow on the stainless-steel background (light mode) or uses bordered surfaces (dark mode) | Must |
| FR-4.3 | Tapping any item navigates to the Event Interior (Screen 6) | Must |
| FR-4.4 | Items are ordered with upcoming events most prominent; past events are visually faded but still accessible | Should |
| FR-4.5 | The header displays "[User's Name]'s Fridge" on the left and a settings gear icon on the right | Must |
| FR-4.6 | Long-press on an item opens a context menu: "Remove from Fridge," "Change Sticker," "Share" | Should |
| FR-4.7 | The fridge supports vertical scrolling for users with many pinned items | Must |
| FR-4.8 | Empty state displays: "Nothing here yet. Your next step starts now." with a prompt to scan a flyer | Must |

### FR-5: Sticker & Magnet System

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-5.1 | After calendar sync, a modal presents a categorized sticker selection grid: Magnets, Stickers, Buttons, Custom Emojis | Must |
| FR-5.2 | Tapping a sticker shows a live preview of it "pinning" to the event item | Must |
| FR-5.3 | The "Add to Fridge" button at the bottom of the modal commits the selection | Must |
| FR-5.4 | A satisfying "click" sound effect plays on commit (respecting system mute settings) | Should |
| FR-5.5 | Sticker categories include: classic magnets (red, blue, yellow), illustrated vinyl stickers (pizza, laptop, theater mask), PFW-colored pin-back buttons, standard emojis | Must |
| FR-5.6 | Users can change their sticker choice after initial selection via long-press context menu on the fridge | Should |

### FR-6: Community Market (Discovery Feed)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-6.1 | A Pinterest-style masonry grid displays flyers scanned by all PFW students | Must |
| FR-6.2 | Each flyer card shows: event image, title, date, and a "Quick Pin" magnet icon | Must |
| FR-6.3 | Tapping the "Quick Pin" icon adds the event to the user's Personal Fridge and calendar in one action | Must |
| FR-6.4 | A search bar at the top supports keyword search (e.g., "Pizza," "Coding," "Theater") | Must |
| FR-6.5 | The feed is sorted by recency by default, with options for "Trending" and "This Week" | Should |
| FR-6.6 | Duplicate flyers (same event scanned by multiple students) are merged into a single entry with a "scanned by X students" indicator | Should |
| FR-6.7 | Infinite scroll with lazy loading of images | Must |

### FR-7: Event Interior (Public Gallery)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-7.1 | The header shows the event title and a minimized version of the original flyer | Must |
| FR-7.2 | A vertical feed displays photos and videos uploaded by all attendees, sorted by recency | Must |
| FR-7.3 | Users can upload photos/videos via a camera icon at the bottom of the screen | Must |
| FR-7.4 | Sticky notes (text comments) and magnet reactions are visible overlaid on media items | Must |
| FR-7.5 | Tapping a media item opens the full-screen Media & Sticker View (Screen 7) | Must |
| FR-7.6 | Gallery content persists indefinitely (no 24-hour expiration) | Must |

### FR-8: Media & Sticker View

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-8.1 | The selected photo/video fills the screen | Must |
| FR-8.2 | A pull-up sticker tray at the bottom contains emoji stickers, PFW-themed icons, and colored sticky notes | Must |
| FR-8.3 | Users can drag a sticker from the tray and drop it anywhere on the photo | Must |
| FR-8.4 | Dropped stickers are persisted and visible to all gallery viewers | Must |
| FR-8.5 | A small "Post-it" attribution shows who posted the media | Must |

### FR-9: Profile & Settings (The Pantry)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| FR-9.1 | Display user stats: events attended, flyers scanned, memories saved | Must |
| FR-9.2 | Default calendar selection preference | Should |
| FR-9.3 | Notification toggles for friend group updates and event reminders | Should |
| FR-9.4 | Upload quality toggle: "High Quality" vs. "Data Saver" | Could |
| FR-9.5 | Privacy setting: Personal Fridge visibility — "Public to Campus" vs. "Friends Only" | Should |
| FR-9.6 | Sign out and account deletion options | Must |

---

## 7. Non-Functional Requirements

### NFR-1: Performance

| ID | Requirement | Target |
| :--- | :--- | :--- |
| NFR-1.1 | App cold start to interactive fridge | < 2 seconds on mid-range devices |
| NFR-1.2 | AI flyer extraction (image to structured JSON) | < 3 seconds on stable Wi-Fi; < 5 seconds on LTE |
| NFR-1.3 | Community Market feed initial load | < 1.5 seconds (above-the-fold content) |
| NFR-1.4 | Gallery image load (individual photo) | < 500ms with CDN caching |
| NFR-1.5 | Gallery scroll performance | 60fps with no dropped frames during continuous scroll |
| NFR-1.6 | Sticker drag-and-drop interaction | < 16ms frame time (60fps) during drag |
| NFR-1.7 | Camera viewfinder to ready state | < 1 second |

### NFR-2: Scalability

| ID | Requirement | Target |
| :--- | :--- | :--- |
| NFR-2.1 | Concurrent users (Phase 1, PFW only) | Support 5,000 concurrent users |
| NFR-2.2 | Media storage per event gallery | Up to 500 photos/videos per event |
| NFR-2.3 | Community Market index | Up to 10,000 unique flyers per semester |

### NFR-3: Reliability & Availability

| ID | Requirement | Target |
| :--- | :--- | :--- |
| NFR-3.1 | Uptime SLA | 99.5% monthly uptime |
| NFR-3.2 | Graceful degradation | If AI extraction fails, fall back to manual entry form |
| NFR-3.3 | Offline behavior | Personal Fridge displays cached data; scanner queues for processing when connectivity returns |

### NFR-4: Security & Privacy

| ID | Requirement | Target |
| :--- | :--- | :--- |
| NFR-4.1 | Authentication | OAuth 2.0 with PFW email domain restriction |
| NFR-4.2 | Data in transit | TLS 1.3 for all API communication |
| NFR-4.3 | Data at rest | AES-256 encryption for stored media and user data |
| NFR-4.4 | FERPA compliance | No academic records are stored or displayed; app handles only event/social data |
| NFR-4.5 | Content moderation | Uploaded media is scanned for policy violations before gallery publication |
| NFR-4.6 | Data retention | Users can delete their account and all associated data within 30 days |

### NFR-5: Accessibility

| ID | Requirement | Target |
| :--- | :--- | :--- |
| NFR-5.1 | Touch targets | Minimum 44x44px for all interactive elements (per DESIGN.md) |
| NFR-5.2 | Screen reader support | All interactive elements have accessible labels |
| NFR-5.3 | Color contrast | WCAG 2.1 AA compliance for all text |
| NFR-5.4 | Reduced motion | Respect system "reduce motion" setting; disable parallax and spring animations |

### NFR-6: Image-Heavy Feed Optimization

Given that the Community Market and Event Galleries are image-dominant experiences, the following optimizations are required:

- **Progressive image loading:** Low-resolution placeholder (blurred thumbnail) displayed immediately; full resolution loads asynchronously.
- **Adaptive image sizing:** Serve appropriately sized images based on device screen density (1x, 2x, 3x).
- **Lazy loading:** Images below the fold are not loaded until the user scrolls within 2 screen-heights of them.
- **Memory management:** Offscreen images are released from memory; the gallery must not exceed 200MB of in-memory image data.
- **Video thumbnails:** Videos display a static thumbnail with a play icon; video data is not fetched until the user taps.

---

## 8. Design System Compliance

All UI implementation must conform to the specifications in `DESIGN.md`. Key mandates are summarized below for quick reference.

### Color Palette (Light Mode)

| Role | Hex | Usage |
| :--- | :--- | :--- |
| Background | `#FFFFFF` | Primary app canvas |
| Surface | `#F8F6F2` | Card containers, flyer backgrounds |
| Primary (Golden) | `#CFB991` | Brand headers, identity moments only |
| Action (Summit Gold) | `#DAAA00` | All interactive elements: buttons, links, active states |
| Text Primary | `#000000` | Headlines and body text |
| Border | `#C8C9C7` | Card outlines and dividers |

### Color Palette (Dark Mode)

| Role | Hex | Usage |
| :--- | :--- | :--- |
| Background | `#0D0D0D` | Primary app background |
| Surface | `#1A1A1A` | Cards and elevated containers |
| Text Primary | `#F0EDE7` | Headlines and body text |
| Border | `#333333` | Subtle dividers (no shadows in dark mode) |

### Typography

| Level | Font | Size | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| H1 | United Sans Cond | 28px | Bold | Screen titles |
| H2 | United Sans Cond | 22px | Medium | Section headers |
| H3 | Acumin Pro | 18px | Semibold | Card/flyer titles |
| Body | Acumin Pro | 16px | Regular | Descriptions |
| Caption | Acumin Pro | 12px | Medium | Timestamps, metadata |
| Overline | United Sans | 11px | Medium (CAPS) | Category tags |

### Spacing

- **Base unit:** 4px
- **Screen margins:** 16px horizontal
- **Card spacing:** 12px gap
- **Internal padding:** 16px inside cards
- **Section breaks:** 24px vertical

### Component Styles

- **Primary Button ("Magnet"):** Background `#DAAA00`, text `#000000`, radius 8px, Acumin Pro Semibold 14px ALL CAPS.
- **Flyer Cards:** Radius 12px, border 1px solid `#E5E3DF` (light) / `#333333` (dark), shadow `0 1px 3px rgba(0,0,0,0.06)` light mode only, featured state 3px top border in Summit Gold.
- **Memory Gallery:** Cards peek at right edge to signal scrollability; images full-bleed or 12px radius with 5-10% warm golden overlay.

### Motion

- **Instant (100ms):** Button press scale-down to 0.97x.
- **Normal (300ms):** Screen transitions between Fridge and Gallery.
- **Overlay (500ms):** Bottom sheets slide up.
- **Progress Indicator:** Mastodon footprint icon for "magnetizing" actions.

### Brand Voice (Microcopy Rules)

- Always use "we" to foster community.
- Never abbreviate "Mastodons" to "Dons."
- **Success state:** "You're registered. See you there, Mastodon."
- **Empty state:** "Nothing here yet. Your next step starts now."

---

## 9. Feature Prioritization (MoSCoW)

### Must Have (Phase 1 MVP — Launch Blockers)

| Feature | Rationale |
| :--- | :--- |
| University email authentication (`@pfw.edu`) | Community trust and safety foundation |
| AI flyer extraction (camera + gallery upload) | Core value proposition — without this, the app is just another calendar |
| Native calendar integration (iOS EventKit / Android CalendarProvider) | The "commitment" moment; bridges physical to digital |
| Personal Fridge with organic collage layout | The home screen *is* the product identity |
| Sticker/magnet selection on event creation | Tactile personalization differentiates from every other event app |
| Community Market with masonry grid and search | Discovery mechanism; creates network effects |
| Event Interior with photo/video gallery | The "memory" half of the value proposition |
| Media & Sticker View with drag-and-drop stickers | Social interaction layer on shared memories |
| Profile with basic stats and sign-out | Account management baseline |
| Bottom navigation with protruding [+] button | Primary navigation and action architecture |

### Should Have (Phase 1 — High Value, Not Blocking Launch)

| Feature | Rationale |
| :--- | :--- |
| Calendar conflict detection | Prevents double-booking; high user trust signal |
| Onboarding tutorial (3 screens max) | Explains the fridge metaphor to first-time users |
| Long-press context menu on fridge items | Power-user efficiency (remove, change sticker, share) |
| Community Market trending/filtering | Helps surface popular events above chronological noise |
| Privacy toggle (Public vs. Friends Only fridge) | User control over personal space |
| Notification preferences | Event reminders and friend activity alerts |
| Duplicate flyer merging in Community Market | Prevents feed clutter from the same event scanned 20 times |
| "Skip calendar, just add to Fridge" option | Respects users who manage calendars separately |

### Could Have (Phase 1 — Nice to Have If Time Permits)

| Feature | Rationale |
| :--- | :--- |
| Upload quality toggle (High Quality vs. Data Saver) | Accommodates students on limited data plans |
| Sound effects on sticker placement | Satisfying tactile feedback (dependent on audio asset availability) |
| Animated sticker placement preview | Enhanced delight during the sticker workshop step |
| "Past Events" visual distinction (faded magnets) | Nostalgia browsing vs. upcoming event emphasis |
| Dark mode | Design system defines it, but light mode is the primary experience |

### Won't Have (Phase 1 — Explicitly Deferred)

| Feature | Rationale |
| :--- | :--- |
| Friends list / social graph | Phase 2; requires significant backend and privacy work |
| Direct messaging between users | Out of scope; the app is event-centric, not chat-centric |
| Event creation without a physical flyer | Phase 2; MVP validates the physical-to-digital bridge |
| Multi-university support | Phase 2+; Phase 1 is PFW-only to validate product-market fit |
| Club/organization verified accounts | Phase 2; requires institutional partnership workflows |
| Push notification delivery | Phase 2; in-app notifications only for Phase 1 |
| Video recording within the app | Phase 1 supports video upload from gallery only |
| Gamification / badges / streaks | Phase 2; engagement mechanics after retention is validated |

---

## 10. Success Metrics & KPIs

### North Star Metric

**Weekly Active Fridge Users (WAFU):** The number of unique users who open their Personal Fridge at least once per week. This measures habitual engagement with the core experience.

### Acquisition Metrics

| Metric | Target (First Semester) | Measurement |
| :--- | :--- | :--- |
| Total registered users | 1,000 (approx. 12% of PFW undergrad population) | Auth system logs |
| Weekly new registrations | 50+ after launch week | Auth system logs |
| Onboarding completion rate | > 80% | Funnel analytics |

### Activation Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| First flyer scanned within 24 hours of registration | > 40% of new users | Event tracking |
| First event added to Fridge within first session | > 60% of new users | Event tracking |
| AI extraction success rate (no manual correction needed) | > 85% | API response analysis |

### Engagement Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| Flyers scanned per active user per week | 2+ | Event tracking |
| Events pinned to Personal Fridge per user per month | 5+ | Database query |
| Gallery photos uploaded per event (median) | 10+ | Storage logs |
| Gallery engagement rate (stickers placed / gallery views) | > 15% | Event tracking |
| Community Market "Quick Pin" conversion rate | > 10% of views result in a pin | Event tracking |
| Average session duration | 3-5 minutes | Analytics SDK |

### Retention Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| Day 7 retention | > 40% | Cohort analysis |
| Day 30 retention | > 25% | Cohort analysis |
| Weekly Active Fridge Users (WAFU) | 500+ by end of first semester | Weekly query |

### Quality Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| App crash rate | < 0.5% of sessions | Crash reporting (e.g., Sentry) |
| AI extraction latency (p95) | < 5 seconds | API monitoring |
| App Store / Play Store rating | 4.0+ | Store reviews |

---

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **AI extraction accuracy insufficient for varied flyer designs** | Medium | High | Implement manual correction fallback UI (FR-2.5); collect correction data to improve prompts; start with structured flyers and expand |
| **Low adoption — students don't change behavior** | Medium | High | Partner with 5-10 active student organizations for launch; seed the Community Market with pre-scanned flyers; campus ambassador program |
| **Inappropriate content in public galleries** | Medium | High | Automated content moderation on upload (NFR-4.5); community reporting mechanism; manual review queue |
| **API cost escalation from LLM calls** | Medium | Medium | Image compression before API call; cache extraction results for duplicate flyers; set per-user daily scan limits (generous: 20/day) |
| **Camera permission friction on first use** | Low | Medium | Clear, contextual permission rationale ("We need your camera to scan flyers"); graceful fallback to gallery upload |
| **Calendar permission denial** | Medium | Medium | App functions without calendar sync (events still pin to fridge); re-prompt with value explanation on next scan |
| **Performance degradation on image-heavy galleries** | Medium | Medium | Progressive loading, lazy loading, memory management (NFR-6); CDN for media delivery |
| **University email OAuth provider limitations** | Low | High | Research PFW's identity provider early in development; have email verification fallback (send code to @pfw.edu address) |

---

## Appendix

### A. Glossary

| Term | Definition |
| :--- | :--- |
| **Magnetize** | The act of scanning a physical flyer and adding it to the user's digital fridge |
| **Personal Fridge** | The user's home dashboard — a digital fridge door displaying their pinned events |
| **Community Market** | The university-wide discovery feed of all scanned flyers |
| **Event Interior** | The public gallery page for a specific event, containing shared photos and memories |
| **Sticker Workshop** | The modal flow where users select a decorative sticker/magnet for their fridge item |
| **Magic Lens** | The AI-powered camera scanner that extracts event data from physical flyers |
| **The Pantry** | The profile and settings screen |
| **Quick Pin** | One-tap action in the Community Market to add an event to your fridge and calendar |

### B. Related Documents

- `DESIGN.md` — Mobile design system (colors, typography, spacing, components, motion, brand voice)
- `UI_DEVELOPMENT_PLAN.md` — Detailed screen specifications and visual requirements for all 8 Phase 1 screens

### C. Open Questions for Stakeholder Review

1. **Friends tab in bottom nav:** The nav bar includes a "Friends" section, but social graph features are deferred to Phase 2. What should this tab display in Phase 1? Options: (a) "Coming Soon" placeholder, (b) Remove from nav and use 4-tab layout, (c) Show a simple list of other PFW users on the platform.
2. **Flyer ownership and moderation:** When a student scans a flyer and it enters the Community Market, who "owns" that entry? Can the original poster edit/delete it? What if the event is cancelled?
3. **Gallery content lifetime:** Galleries persist indefinitely (FR-7.6), but storage costs scale linearly. Should we implement an archival policy (e.g., compress media after 6 months)?
4. **University partnership:** Does PFW's administration need to approve or endorse the app? Are there institutional requirements for apps using PFW branding (colors, "Mastodon" name)?
5. **LLM provider selection:** The PRD specifies "multimodal LLM" generically. Final provider selection (Claude Vision, GPT-4V, Gemini) should be determined during the technical spike based on accuracy benchmarks against real PFW flyers.
