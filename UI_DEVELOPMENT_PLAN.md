# Mastodon Fridge: UI Development Plan (Phase 1)

> **Source of Truth** for all UI development. Follow this document exactly. Do not invent new screens or styles.

---

## Screen 1: The Entry Point (Authentication & Welcome)

**Description:** A clean, distraction-free screen. The background is a subtle, high-quality texture (brushed stainless steel or a minimalist white fridge finish).

**Core Elements:**

- **Central Graphic:** A stylized "Mastodon Fridge" logo (perhaps a mastodon-shaped magnet).
- **Action:** A single "Sign in with University Email" button to ensure a verified campus community.
- **Vibe:** Professional yet welcoming, signaling that this is a dedicated space for student life.

---

## Screen 2: The Personal Fridge (Home Dashboard)

**Description:** This screen is a digital representation of a brushed stainless steel fridge door. It is not a rigid list but a dynamic collage where every element feels like a physical object pinned to a metallic surface. The layout uses an organic, slightly "messy" 3-column grid to mimic how someone would actually decorate a fridge.

### Visual Style & Texture

- **Background:** A high-definition, vertical-brushed metal texture (stainless steel) with subtle light reflections and "grain."
- **Physicality:** Every item on the fridge (photos, stickers, notes) casts a soft, realistic drop shadow onto the metal, giving the UI a deep 3D feel.

### Core Elements

- **Top Header:** Minimalist and clean. On the far left, "Quang's Fridge" is written in a crisp, white sans-serif font. On the far right, a single Settings (Gear) icon sits flush with the text.
- **The Fridge Surface (The Collage):** A collection of interactive "memories" and "pins" scattered across the door.
  - **3D Magnets:** Realistic 3D objects (like a red heart magnet) that appear to be physically "holding up" photos or event flyers.
  - **Polaroids & Photos:** Rectangular images with thick white borders, often slightly tilted or rotated (not perfectly straight) to look hand-pinned.
  - **Standalone Stickers:** Cut-out style icons representing different vibes — a burger for food, a camera for media, a math symbol for academics, or a donut. These are "stuck" directly to the steel.
  - **Sticky Notes:** Classic yellow square "Post-it" style notes with a slight curl at the bottom edge, containing short handwritten-style text.
- **Integrated Bottom Navigation Bar:** A modern, translucent "frosted glass" (blur effect) bar that sits at the very bottom.
  - **Layout:** Five distinct sections: Fridge (Home), Market (Discovery), a central [+] Action, Friends, and Profile.
  - **The Centerpiece:** The [+] button is a prominent white circle with a bold blue plus sign, housed in a unique "circular cutout" that protrudes slightly upward from the navigation bar, making it the most tactile element on the screen.

---

## Screen 3: The AI "Magic Lens" (Scanner View)

**Description:** A standard camera interface but with a "smart" overlay.

**Core Elements:**

- **Scanning Frame:** A glowing square in the center where the user aligns the flyer.
- **Real-time AI Overlay:** As the camera focuses, "bounding boxes" appear over text (Event Name, Time, Location) to show the AI is actively "reading" the flyer.
- **Controls:** Shutter button, Flash toggle, and an "Upload from Gallery" button for flyers saved as screenshots.

---

## Screen 4: The Confirmation & Sticker Workshop

This screen is less of a static page and more of a two-step interaction loop that bridges the gap between the phone's system and your app's unique "Fridge" world.

### Step A: The Native Handoff (The Calendar Sheet)

- **Trigger:** Immediately after the AI scans the flyer and the user confirms the "Add to Calendar" action.
- **Description:** The app triggers the Native System Calendar Sheet (Apple Calendar on iOS or Google Calendar on Android).
- **Details:**
  - The screen is pre-filled with the extracted flyer data: Title, Start/End Time, and Location.
  - The user sees the familiar system UI, allowing them to choose which specific calendar to add it to (e.g., "School" vs. "Personal") or set an alert.
- **The Transition:** Once the user taps the native "Add" button in the top right, the calendar sheet slides down, returning the user to your app.

### Step B: The "Choose your sticker?" Pop-up

- **Description:** A sleek, centered rectangular modal (pop-up) that appears the moment the user returns from the calendar. The background is slightly blurred (frosted glass effect) to keep focus on the choice.
- **Core Elements:**
  - **Header:** A playful title at the top: "Choose your sticker?"
  - **The Selection Tray:** A scrollable, categorized grid of items. Instead of a boring list, these are high-quality, 3D-style assets:
    - **Magnets:** Classic colorful plastic magnets (red, blue, yellow).
    - **Stickers:** Flat, illustrated "vinyl" style stickers (e.g., a slice of pizza for food events, a laptop for coding, a mask for theater).
    - **Buttons:** Metallic pin-back buttons with PFW colors (Blue and Gold) or specific club logos.
    - **Custom Emojis:** A section for standard emojis if the user wants something quick.
  - **The Interaction:** As the user taps an option, a Live Preview shows that sticker "pinning" itself to the digital flyer/magnet they just created.
  - **Primary Action:** A bold "Add to Fridge" button at the bottom of the pop-up.
- **The Result:** The pop-up disappears with a satisfying "click" sound effect, and the user is redirected to their Personal Fridge, where their brand-new, customized event sticker is now officially pinned.

---

## Screen 5: The Community Market (Discovery Feed)

**Description:** A secondary tab (accessible via the bottom nav or FAB) that acts as the "Digital Bulletin Board" of the entire university.

**Core Elements:**

- **Search Bar:** To find specific clubs or keywords (e.g., "Pizza," "Coding").
- **Masonry Grid:** A dense, Pinterest-style feed of flyers scanned by other students.
- **"Quick Pin" Icon:** Each flyer has a small magnet icon in the corner; tapping it instantly adds that event to the user's Personal Fridge and Calendar.

---

## Screen 6: The Event Interior (Public Gallery)

**Description:** Accessed by tapping any magnet on the Personal Fridge. This is the social hub for that specific event.

**Core Elements:**

- **Header Area:** The original flyer is minimized to the corner. The main title of the event is bold at the top.
- **The Shared Wall:** A vertical, high-speed feed of photos and videos uploaded by all attendees.
- **The Interaction Layer:** Users can see "Sticky Notes" (text comments) and "Magnets" (reactions) floating on top of images.
- **Upload Button:** A camera icon at the bottom to contribute their own media to the public "Fridge."

---

## Screen 7: The Close-up (Media & Sticker View)

**Description:** A full-screen view triggered by tapping a specific photo or video in the Gallery.

**Core Elements:**

- **Main Media:** The photo/video fills the screen.
- **Tactile Sticker Tray:** A pull-up drawer at the bottom containing "Digital Magnets" (Emoji stickers, PFW-themed icons, and colored Sticky Notes).
- **Action:** Users can drag a sticker from the tray and "drop" it anywhere on the photo. Once dropped, it's saved for everyone in the Public Gallery to see.
- **Attribution:** A small "Post-it" at the bottom showing who posted the media.

---

## Screen 8: The Pantry (Profile & Archive Settings)

**Description:** A clean, settings-focused screen.

**Core Elements:**

- **Stats:** "12 Events Attended," "5 Flyers Scanned," "20 Memories Saved."
- **Preferences:** Default calendar selection, notification toggles for "Friend Group" updates, and "High Quality" vs "Data Saver" upload modes.
- **Privacy:** Manage who can see your "Personal Fridge" (Public to Campus vs. Friends Only).

---

## Detailed User Journey

### The Morning Flow: The Daily Check-in

- **7:30 AM:** Alex opens Mastodon Fridge over coffee.
- **The Glance:** He looks at his Personal Fridge. He sees a "Math Club Study Session" magnet pinned for 4:00 PM today.
- **The Interaction:** He taps the magnet. A sticky note left by a friend on the public gallery says, "Bringing donuts today!"
- **The Result:** Alex feels a sense of belonging and "social proof" that the event is worth attending before his day even starts.

### The Midday Flow: The Capture & Commit

- **12:15 PM:** While walking through Kettler Hall, Alex spots a stylized flyer for a "Theater Staged Reading" at the Williams Theatre.
- **The Capture:** He hits the [+] button in the app. The AI scanner instantly pulls the details.
- **The Commitment:** He taps "Add to Fridge." The app asks, "You have Linear Algebra at that time; add anyway?" (leveraging his calendar data). He taps Yes, and the event is instantly synced to his Google Calendar.
- **The Share:** The flyer is now live in the Community Market, allowing other students to discover the play because Alex took that one photo.

### The Weekly Flow: The Sunday Reflection

- **Sunday Evening:** Alex is winding down. He scrolls through his "Past Events" on the fridge.
- **The Archive:** He clicks on the "AI Hackathon" magnet from Friday.
- **The Nostalgia:** He spends five minutes scrolling through the 50+ photos and videos uploaded by the 20 other attendees. He sees a video of himself presenting his project that he didn't even know someone filmed.
- **The Action:** He leaves a "Gold Star" sticker on the video and feels a surge of pride in his campus involvement. His "Fridge" is no longer just a schedule — it's a trophy case of his semester.
