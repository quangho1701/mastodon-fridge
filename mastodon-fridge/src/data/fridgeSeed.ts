import type { ImageSourcePropType } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';
import type { PhotoCardAvatar } from '../components/PhotoCard';

type IoniconName = keyof typeof Ionicons.glyphMap;
type ColumnIndex = 0 | 1 | 2;

// ────────────────────────────────────────────────────────────────────
// Fridge item kinds
// ────────────────────────────────────────────────────────────────────

export type FridgeItem =
  | {
      kind: 'polaroid';
      id: string;
      imageSource?: ImageSourcePropType;
      caption?: string;
      rotation: number;
      topMagnet?: 'heart' | 'gold' | 'none';
      columnHint?: ColumnIndex;
      tappable?: boolean;
      accessibilityLabel?: string;
      size?: number;
    }
  | {
      kind: 'flyer';
      id: string;
      title: string;
      date?: string;
      featured?: boolean;
      rotation: number;
      topMagnet?: 'heart' | 'gold' | 'none';
      columnHint?: ColumnIndex;
    }
  | {
      kind: 'note';
      id: string;
      text: string;
      color?: string;
      rotation: number;
      columnHint?: ColumnIndex;
    }
  | {
      kind: 'sticker';
      id: string;
      icon: IoniconName;
      fillColor: string;
      size?: number;
      shape?: 'round' | 'rounded';
      rotation: number;
      columnHint?: ColumnIndex;
    }
  | {
      kind: 'photoCard';
      id: string;
      imageSource?: ImageSourcePropType;
      avatar?: PhotoCardAvatar;
      width?: number;
      height?: number;
      aspect?: number;
      rotation: number;
      tappable?: boolean;
      accessibilityLabel?: string;
    }
  | {
      kind: 'letterMagnet';
      id: string;
      letter: string;
      color: string;
      size?: number;
      rotation: number;
    }
  | {
      kind: 'crumpledNote';
      id: string;
      lines?: string[];
      width?: number;
      height?: number;
      rotation: number;
    };

// ────────────────────────────────────────────────────────────────────
// Shelf-level layout
// ────────────────────────────────────────────────────────────────────

export interface CuratedPlacement {
  item: FridgeItem;
  /** 0..1 — fraction of shelf width from the left. */
  xPct?: number;
  /** Absolute pixels from top of shelf. */
  y?: number;
  /** Extra horizontal pixel offset applied after xPct (fine tuning). */
  offsetX?: number;
  z?: number;
}

export type FridgeShelf =
  | {
      kind: 'curated';
      id: string;
      minHeight: number;
      placements: CuratedPlacement[];
    }
  | { kind: 'collage'; id: string; items: FridgeItem[] }
  | { kind: 'divider'; id: string; variant?: 'gold' | 'hairline' };

// ────────────────────────────────────────────────────────────────────
// Image asset map
//
// Drop images into `src/assets/fridge/` then uncomment each require()
// below. Until then PhotoCard / Polaroid render a placeholder block.
// ────────────────────────────────────────────────────────────────────

export const fridgeAssets: Record<string, ImageSourcePropType | undefined> = {
  girlsPolaroid: require('../assets/fridge/girls-polaroid.jpg'),
  dog: require('../assets/fridge/dog.jpg'),
  landscape: require('../assets/fridge/landscape.jpg'),
  glassesSelfie: require('../assets/fridge/glasses-selfie.jpg'),
  croissants: require('../assets/fridge/croissants.jpg'),
  cliffSelfie: require('../assets/fridge/cliff-selfie.jpg'),
  avatarAlex: require('../assets/fridge/avatar-1.jpg'),
  avatarJordan: require('../assets/fridge/avatar-2.jpg'),
  avatarSam: require('../assets/fridge/avatar-3.jpg'),
  avatarRiley: require('../assets/fridge/avatar-4.jpg'),
  avatarTaylor: require('../assets/fridge/avatar-5.jpg'),
};

// Avatar palette — used for the initials-fallback when a real avatar
// image isn't available. Colors picked to feel distinct + warm.
const AVATAR_COLORS = {
  alex: '#E58B6B',
  jordan: '#F2B950',
  sam: '#7B5AA6',
  riley: '#C36E8A',
  taylor: '#4F9A8C',
};

// ────────────────────────────────────────────────────────────────────
// Curated layout — matches the reference fridge mockup
// ────────────────────────────────────────────────────────────────────

export const fridgeLayout: FridgeShelf[] = [
  // ─── TOP SHELF — polaroid of the girls + mom's sticky note ───
  {
    kind: 'curated',
    id: 'shelf-top',
    minHeight: 180,
    placements: [
      {
        xPct: 0.06,
        y: 18,
        item: {
          kind: 'polaroid',
          id: 'p-girls',
          imageSource: fridgeAssets.girlsPolaroid,
          caption: undefined,
          rotation: -4,
          size: 124,
        },
      },
      {
        xPct: 0.52,
        y: 12,
        item: {
          kind: 'note',
          id: 'n-mom',
          text: 'Miss you!\nLove, mom ❤️',
          color: '#FEF285',
          rotation: 1.5,
        },
      },
    ],
  },

  // ─── GOLD SHELF DIVIDER ───
  { kind: 'divider', id: 'd-1', variant: 'gold' },

  // ─── BOTTOM SHELF — photos with avatars, SMITHS magnets, etc. ───
  {
    kind: 'curated',
    id: 'shelf-bottom',
    minHeight: 480,
    placements: [
      // Row A — dog + landscape
      {
        xPct: 0.025,
        y: 8,
        item: {
          kind: 'photoCard',
          id: 'pc-dog',
          imageSource: fridgeAssets.dog,
          avatar: {
            imageSource: fridgeAssets.avatarAlex,
            initials: 'AL',
            color: AVATAR_COLORS.alex,
          },
          width: 143,
          height: 112,
          rotation: -1,
          accessibilityLabel: 'Dog on grass, posted by Alex',
        },
      },
      {
        xPct: 0.48,
        y: 8,
        item: {
          kind: 'photoCard',
          id: 'pc-landscape',
          imageSource: fridgeAssets.landscape,
          avatar: {
            imageSource: fridgeAssets.avatarJordan,
            initials: 'JO',
            color: AVATAR_COLORS.jordan,
          },
          width: 142,
          height: 112,
          rotation: 1.5,
          accessibilityLabel: 'Landscape, posted by Jordan',
        },
      },

      // Row B — crumpled note + SMITHS letters
      {
        xPct: 0.035,
        y: 138,
        item: {
          kind: 'crumpledNote',
          id: 'cn-1',
          rotation: -2.5,
          width: 68,
          height: 92,
        },
      },
      ...smithsMagnets(),

      // Glasses-selfie — overlaps landscape's bottom-right and row B.
      // Drawn AFTER row-B items so it layers above them.
      {
        xPct: 0.66,
        y: 84,
        z: 3,
        item: {
          kind: 'photoCard',
          id: 'pc-glasses',
          imageSource: fridgeAssets.glassesSelfie,
          avatar: {
            imageSource: fridgeAssets.avatarSam,
            initials: 'SA',
            color: AVATAR_COLORS.sam,
          },
          width: 90,
          height: 122,
          rotation: 1.5,
          accessibilityLabel: 'Selfie with glasses, posted by Sam',
        },
      },

      // Row C — croissants centered-ish
      {
        xPct: 0.14,
        y: 238,
        item: {
          kind: 'photoCard',
          id: 'pc-croissants',
          imageSource: fridgeAssets.croissants,
          avatar: {
            imageSource: fridgeAssets.avatarRiley,
            initials: 'RI',
            color: AVATAR_COLORS.riley,
          },
          width: 172,
          height: 112,
          rotation: 0.7,
          accessibilityLabel: 'Fresh croissants, posted by Riley',
        },
      },

      // Row D — green star sticker + cliff selfie
      {
        xPct: 0.01,
        y: 368,
        item: {
          kind: 'sticker',
          id: 's-star',
          icon: 'star',
          fillColor: '#1FC04E',
          size: 56,
          shape: 'round',
          rotation: -12,
        },
      },
      {
        xPct: 0.21,
        y: 352,
        item: {
          kind: 'photoCard',
          id: 'pc-cliff',
          imageSource: fridgeAssets.cliffSelfie,
          avatar: {
            imageSource: fridgeAssets.avatarTaylor,
            initials: 'TA',
            color: AVATAR_COLORS.taylor,
          },
          width: 220,
          height: 134,
          rotation: -1.5,
          accessibilityLabel: 'Cliff selfie, posted by Taylor',
        },
      },
    ],
  },
];

/** "SMITHS" letters placed mid-Row-B, colored to match the reference. */
function smithsMagnets(): CuratedPlacement[] {
  const letters: { letter: string; color: string; rot: number }[] = [
    { letter: 'S', color: '#DF1414', rot: -4 },
    { letter: 'M', color: '#155FD4', rot: 3 },
    { letter: 'I', color: '#13A02C', rot: -2 },
    { letter: 'T', color: '#E55800', rot: 4 },
    { letter: 'H', color: '#155FD4', rot: -3 },
    { letter: 'S', color: '#13A02C', rot: 2 },
  ];
  const startX = 0.32;
  const stepX = 0.072;
  const baseY = 158;

  return letters.map((l, i) => ({
    xPct: startX + i * stepX,
    y: baseY + (i % 2 === 0 ? 0 : -2),
    item: {
      kind: 'letterMagnet',
      id: `lm-smiths-${i}`,
      letter: l.letter,
      color: l.color,
      size: 34,
      rotation: l.rot,
    },
  }));
}

// ────────────────────────────────────────────────────────────────────
// Legacy flat seed — kept for back-compat (standalone FridgeCollage)
// ────────────────────────────────────────────────────────────────────

export const fridgeSeed: FridgeItem[] = [
  {
    kind: 'flyer',
    id: 'f-math',
    title: 'Math Club Study Session',
    date: 'Today · 4:00 PM',
    featured: true,
    rotation: -3,
    topMagnet: 'heart',
    columnHint: 0,
  },
  {
    kind: 'sticker',
    id: 's-burger',
    icon: 'fast-food',
    fillColor: '#E94F37',
    size: 60,
    shape: 'round',
    rotation: 6,
    columnHint: 0,
  },
  {
    kind: 'polaroid',
    id: 'p-theater',
    caption: 'Staged Reading',
    rotation: 4,
    topMagnet: 'gold',
    columnHint: 0,
    tappable: true,
    accessibilityLabel: 'Theater event photo',
  },
  {
    kind: 'note',
    id: 'n-donuts',
    text: 'Bringing donuts today!',
    rotation: -5,
    columnHint: 0,
  },
  {
    kind: 'polaroid',
    id: 'p-hackathon',
    caption: 'AI Hackathon',
    rotation: -2,
    topMagnet: 'heart',
    columnHint: 1,
    tappable: true,
    accessibilityLabel: 'AI Hackathon memories',
  },
  {
    kind: 'flyer',
    id: 'f-theater',
    title: 'Theater Staged Reading',
    date: 'Fri · 7:00 PM · Williams Theatre',
    rotation: 2,
    topMagnet: 'gold',
    columnHint: 1,
  },
  {
    kind: 'sticker',
    id: 's-math',
    icon: 'calculator',
    fillColor: '#4D77FF',
    size: 52,
    shape: 'rounded',
    rotation: -8,
    columnHint: 1,
  },
  {
    kind: 'flyer',
    id: 'f-reflect',
    title: 'Sunday Reflection',
    date: 'Sun · 6:00 PM',
    rotation: -3,
    columnHint: 1,
  },
  {
    kind: 'sticker',
    id: 's-camera',
    icon: 'camera',
    fillColor: '#2C3E50',
    size: 56,
    shape: 'round',
    rotation: 4,
    columnHint: 2,
  },
  {
    kind: 'note',
    id: 'n-coffee',
    text: 'Coffee with the Dons @ 9',
    rotation: 3,
    columnHint: 2,
  },
  {
    kind: 'flyer',
    id: 'f-pizza',
    title: 'CS Pizza Friday',
    date: 'Fri · 12:00 PM',
    rotation: 5,
    topMagnet: 'heart',
    columnHint: 2,
  },
  {
    kind: 'sticker',
    id: 's-donut',
    icon: 'cafe',
    fillColor: '#F7B5CD',
    size: 56,
    shape: 'round',
    rotation: -6,
    columnHint: 2,
  },
];
