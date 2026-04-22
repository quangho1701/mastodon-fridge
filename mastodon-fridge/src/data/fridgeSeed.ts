import type { ImageSourcePropType } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;
type ColumnIndex = 0 | 1 | 2;

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
    };

export const fridgeSeed: FridgeItem[] = [
  // Column 0 — left
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

  // Column 1 — middle
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

  // Column 2 — right
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
