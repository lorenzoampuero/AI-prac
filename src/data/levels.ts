// Level ladder — the last level sits exactly at the full XP pool (48 lessons × 10 + 48 exercises × 15 =
// 1200) so “complete everything” reads as Master. Thresholds are gentle early and stretch later; the
// curve is data, not code, so retuning is a one-line change with tests guarding monotonicity.

export interface LevelDef {
  level: number;
  name: string;
  minXp: number;
}

export const LEVELS: LevelDef[] = [
  { level: 1, name: 'Curious', minXp: 0 },
  { level: 2, name: 'Explorer', minXp: 60 },
  { level: 3, name: 'Apprentice', minXp: 150 },
  { level: 4, name: 'Builder', minXp: 280 },
  { level: 5, name: 'Practitioner', minXp: 420 },
  { level: 6, name: 'Crafter', minXp: 580 },
  { level: 7, name: 'Verifier', minXp: 750 },
  { level: 8, name: 'Specialist', minXp: 920 },
  { level: 9, name: 'Strategist', minXp: 1060 },
  { level: 10, name: 'Master', minXp: 1200 },
];
