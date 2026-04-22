# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mastodon Fridge is a mobile-first app for Purdue Fort Wayne (PFW) students that digitizes the experience of a communal fridge door — students scan physical flyers with AI, pin events to a personal "fridge," and share photos/memories in event galleries. No code has been written yet; the repo contains design specs only.

## Key Design Documents

- **DESIGN.md** — Mobile design system: color palette (Black & Gold / Summit Gold `#DAAA00`), typography (United Sans Cond + Acumin Pro), spacing (4px base unit), component styles, motion guidelines, and brand voice rules.
- **UI_DEVELOPMENT_PLAN.md** — Source of truth for all UI screens (Phase 1). Defines 8 screens: Entry/Auth, Personal Fridge (home dashboard), AI Magic Lens (scanner), Confirmation & Sticker Workshop, Community Market (discovery feed), Event Interior (public gallery), Media & Sticker View, and Profile/Archive. Includes detailed user journey flows.

## Architecture Notes

- The Personal Fridge (Screen 2) uses an organic 3-column collage layout on a stainless-steel texture background, not a standard list/grid.
- Bottom navigation has 5 sections with a protruding center [+] action button.
- The AI scanner (Screen 3) extracts event data from physical flyers and pre-fills native calendar sheets.
- The sticker/magnet system is core to the UX — 3D magnets, polaroids, sticky notes, and stickers are interactive objects on the fridge surface.
- Light mode uses shadows for depth; dark mode uses borders only (no shadows).

## Brand Rules

- Always use "we" in microcopy to foster community.
- Never abbreviate "Mastodons" to "Dons."
- Summit Gold (`#DAAA00`) is the action/interactive color; Golden (`#CFB991`) is for brand identity moments only.
- Minimum touch target: 44x44px.
