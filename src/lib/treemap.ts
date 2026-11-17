export type Basis = 'disk' | 'logical';

export interface Folder {
  id: string;
  name: string;
  disk: number;
  logical: number;
  /** Shown in the accessible description only. */
  logicalNote?: string;
}

// Example data, in GB. Logical counts every APFS clone copy in full; on disk counts shared blocks once.
export const FOLDERS: Folder[] = [
  { id: 'library', name: 'Library', disk: 214, logical: 238 },
  { id: 'movies', name: 'Movies', disk: 96, logical: 96 },
  { id: 'developer', name: 'Developer', disk: 41, logical: 63, logicalNote: 'clones counted at full size' },
  { id: 'music', name: 'Music', disk: 18, logical: 18 },
  { id: 'downloads', name: 'Downloads', disk: 12, logical: 13 }
];

/**
 * Grid tracks for a two-column slice layout: the first folder fills the left column,
 * the others stack in the right column. Sizes are used directly as fr values (sum >> 1),
 * so each block's area is proportional to its bytes and tracks interpolate smoothly.
 */
export function tracks(sizes: number[]) {
  const [first, ...others] = sizes;
  const rest = others.reduce((a, b) => a + b, 0);
  return {
    columns: `${first}fr ${rest}fr`,
    rows: others.map((s) => `${s}fr`).join(' ')
  };
}

/** Label size is proportional to bytes, never below 12px. */
export const labelPx = (gb: number) => Math.max(12, Math.round(gb * 0.19 * 10) / 10);
