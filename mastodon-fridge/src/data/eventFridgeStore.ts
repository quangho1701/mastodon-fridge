import type { FridgeItem } from './fridgeSeed';
import type { MarketFlyer } from './marketSeed';

const AVATAR_PALETTE = [
  '#E58B6B',
  '#7BA98F',
  '#C9A66B',
  '#9B7EBD',
  '#5C9EAD',
  '#D97D7D',
];

const NOTE_PALETTE = [
  '#FEF285',
  '#FFD3DC',
  '#C8E6F5',
  '#D5F0C9',
  '#FFE0B5',
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash + str.charCodeAt(i) * (i + 1)) | 0;
  }
  return Math.abs(hash);
}

function deterministicRotation(id: string): number {
  return (hashString(id) % 7) - 3;
}

function pickFromPalette<T>(palette: T[], seed: string): T {
  return palette[hashString(seed) % palette.length];
}

const cache = new Map<string, FridgeItem[]>();

/**
 * Best-effort conversion of an event flyer's seed photos into fridge items.
 * Photos with images become photo cards; captions-only become sticky notes
 * (which fit the fridge metaphor better than empty placeholders); the rest
 * are dropped. Hand-authored `flyer.fridgeItems` always wins over conversion.
 */
export function flyerToFridgeItems(flyer: MarketFlyer): FridgeItem[] {
  const photos = flyer.photos ?? [];
  const items: FridgeItem[] = [];

  photos.forEach((photo) => {
    if (photo.imageSource) {
      items.push({
        kind: 'photoCard',
        id: photo.id,
        imageSource: photo.imageSource,
        avatar: {
          initials: photo.authorInitial ?? photo.authorName.slice(0, 1),
          color: pickFromPalette(AVATAR_PALETTE, photo.authorName),
        },
        width: 140,
        rotation: deterministicRotation(photo.id),
      });
      return;
    }
    if (photo.caption) {
      items.push({
        kind: 'note',
        id: photo.id,
        text: photo.caption,
        color: pickFromPalette(NOTE_PALETTE, photo.id),
        rotation: deterministicRotation(photo.id),
      });
    }
  });

  return items;
}

export function getEventFridgeItems(
  eventId: string,
  flyer: MarketFlyer | undefined,
): FridgeItem[] {
  const cached = cache.get(eventId);
  if (cached) return cached;

  const seeded = flyer?.fridgeItems ?? (flyer ? flyerToFridgeItems(flyer) : []);
  cache.set(eventId, seeded);
  return seeded;
}

export function appendEventFridgeItem(
  eventId: string,
  item: FridgeItem,
): FridgeItem[] {
  const current = cache.get(eventId) ?? [];
  const next = [item, ...current];
  cache.set(eventId, next);
  return next;
}
