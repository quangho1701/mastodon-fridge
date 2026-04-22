# Mobile System Design: The Mastodon Fridge

> A specialized mobile-first extension of the Purdue Fort Wayne design system, optimized for "magnetizing" campus life into a digital collaborative space.

---

## 1. Visual Theme: "Grounded Power"
* **Atmosphere:** The app should feel like a crisp Indiana morning—warm, purposeful, and community-driven.
* **Design Density:** Medium density to balance information-rich flyers with enough breathing room to avoid cognitive overload.
* **Materiality:** Elements should feel tactile, like physical items on a fridge, using rounded interactive elements and authentic photography.

---

## 2. Mobile Color Palette
The palette is rooted in PFW’s official Black and Gold, using **Summit Gold** specifically for interactivity.

### Light Mode
| Role | Name | Hex | Application |
| :--- | :--- | :--- | :--- |
| **Background** | White | `#FFFFFF` | Primary app canvas. |
| **Surface** | Ivory | `#F8F6F2` | Card containers and flyer backgrounds. |
| **Primary** | Golden | `#CFB991` | Brand headers and identity moments. |
| **Action** | Summit | `#DAAA00` | "Magnetize" buttons, links, and active states. |
| **Text Primary** | Black | `#000000` | Headlines and primary body text. |
| **Border** | Light Gray | `#C8C9C7` | Standard card outlines and dividers. |

### Dark Mode
| Role | Name | Hex | Application |
| :--- | :--- | :--- | :--- |
| **Background** | Deep Black | `#0D0D0D` | Primary app background. |
| **Surface** | Charcoal | `#1A1A1A` | Cards and elevated containers. |
| **Text Primary** | Cream | `#F0EDE7` | Headlines and primary body text. |
| **Border** | Dark Gray | `#333333` | Subtle dividers (no shadows used). |

---

## 3. Mobile Typography Scale
Typography is engineered for clarity on small screens using a clear hierarchy.

| Level | Font | Size | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | United Sans Cond | 28px | Bold | Screen titles (e.g., "The Fridge"). |
| **H2** | United Sans Cond | 22px | Medium | Section headers. |
| **H3** | Acumin Pro | 18px | Semibold | Card and flyer titles. |
| **Body** | Acumin Pro | 16px | Regular | Event descriptions. |
| **Caption** | Acumin Pro | 12px | Medium | Timestamps and metadata. |
| **Overline** | United Sans | 11px | Med (Caps) | Category tags (e.g., "SPORTS"). |

---

## 4. Spacing & Layout
Built on a **4px base unit** to ensure mathematical consistency.

* **Screen Margins:** 16px horizontal padding for standard content.
* **Touch Targets:** Minimum 44px x 44px for all buttons and stickers to ensure accessibility.
* **Card Spacing:** 12px gap between cards in a vertical feed.
* **Internal Padding:** 16px padding inside all cards and flyers.
* **Section Breaks:** 24px vertical spacing between different content groups.

---

## 5. Component Styling

### The "Magnet" (Primary Button)
* **Background:** `#DAAA00` (Summit Gold).
* **Text:** `#000000` (Black).
* **Radius:** 8px.
* **Font:** Acumin Pro Semibold, 14px, ALL CAPS.

### Flyer Cards
* **Radius:** 12px rounded corners.
* **Border:** 1px solid `#E5E3DF` (Light Mode) or `#333333` (Dark Mode).
* **Shadow:** Level 1 (`0 1px 3px rgba(0,0,0,0.06)`) in Light Mode only.
* **Featured State:** 3px top border in Summit Gold.

### Memory Gallery (Horizontal Scroll)
* **Peek:** Cards should peek at the right edge to signal scrollability.
* **Images:** Full-bleed or 12px rounded corners with a 5-10% warm golden overlay.

---

## 6. Motion & Depth

### Elevation
* **Surface Layer:** Background color.
* **Content Layer:** Surface color (cards).
* **Overlay Layer:** Bottom sheets for event details slide up from the bottom (500ms).

### Animations
* **Instant (100ms):** Button press scale-down (0.97x).
* **Normal (300ms):** Transitioning between the Fridge and the Gallery.
* **Feedback:** Use the Mastodon footprint icon as a progress indicator for "magnetizing" actions.

---

## 7. Brand Voice (Microcopy)
The app speaks as a supportive peer: purposeful, pragmatically optimistic, and inclusive.

* **Success State:** "You're registered. See you there, Mastodon."
* **Empty State:** "Nothing here yet. Your next step starts now."
* **Language:** Always use "we" to foster community; never abbreviate "Mastodons" to "Dons."

---