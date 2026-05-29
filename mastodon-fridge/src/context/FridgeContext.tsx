import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { StickerSelection } from '../components/StickerPickerModal';

/**
 * A sticker/magnet/emoji the user has pinned to their PERSONAL fridge.
 * X is a 0..1 fraction of the door width (no horizontal scroll), while Y is an
 * absolute pixel position in the SCROLL CONTENT so the sticker stays glued to
 * the fridge surface and scrolls with the shelves. This is intentionally
 * separate from the curated `fridgeLayout` shelf system and from the per-event
 * fridge store.
 */
export type PlacedSticker = {
  id: string;
  selection: StickerSelection;
  sourceTitle: string;
  /** 0..1 — center X as a fraction of the fridge door width. */
  xPct: number;
  /** Absolute center Y in pixels within the scroll content. */
  y: number;
  rotation: number;
  size: number;
};

/** The item being positioned right now, before it is committed. */
type PlacementDraft = {
  selection: StickerSelection;
  sourceTitle: string;
} | null;

interface FridgeContextValue {
  placed: PlacedSticker[];
  draft: PlacementDraft;
  beginPlacement: (selection: StickerSelection, sourceTitle: string) => void;
  commitPlacement: (xPct: number, y: number) => void;
  cancelPlacement: () => void;
  removePlaced: (id: string) => void;
}

const FridgeContext = createContext<FridgeContextValue | undefined>(undefined);

export const STICKER_SIZE = 64;

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `placed-${Date.now()}-${idCounter}`;
}

/** Small organic tilt so pinned stickers don't look mechanically aligned. */
function randomRotation(): number {
  return Math.round((Math.random() * 6 - 3) * 10) / 10;
}

export function FridgeProvider({ children }: { children: React.ReactNode }) {
  const [placed, setPlaced] = useState<PlacedSticker[]>([]);
  const [draft, setDraft] = useState<PlacementDraft>(null);

  const beginPlacement = useCallback(
    (selection: StickerSelection, sourceTitle: string) => {
      setDraft({ selection, sourceTitle });
    },
    [],
  );

  const commitPlacement = useCallback(
    (xPct: number, y: number) => {
      if (!draft) return;
      const item: PlacedSticker = {
        id: nextId(),
        selection: draft.selection,
        sourceTitle: draft.sourceTitle,
        xPct,
        y,
        rotation: randomRotation(),
        size: STICKER_SIZE,
      };
      setPlaced((prev) => [...prev, item]);
      setDraft(null);
    },
    [draft],
  );

  const cancelPlacement = useCallback(() => {
    setDraft(null);
  }, []);

  const removePlaced = useCallback((id: string) => {
    setPlaced((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo<FridgeContextValue>(
    () => ({
      placed,
      draft,
      beginPlacement,
      commitPlacement,
      cancelPlacement,
      removePlaced,
    }),
    [
      placed,
      draft,
      beginPlacement,
      commitPlacement,
      cancelPlacement,
      removePlaced,
    ],
  );

  return (
    <FridgeContext.Provider value={value}>{children}</FridgeContext.Provider>
  );
}

export function useFridge(): FridgeContextValue {
  const ctx = useContext(FridgeContext);
  if (!ctx) {
    throw new Error('useFridge must be used within a FridgeProvider');
  }
  return ctx;
}
