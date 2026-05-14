import type { MuscleGroup, RankLetter } from '../theme'

export type WorkoutType = 'weights' | 'bodyweight' | 'hybrid'

export interface MuscleSkill {
  level: number
  /** 0..1 progress toward next level */
  progress: number
}

export interface HunterProfile {
  name: string
  level: number
  rank: RankLetter
  /** 0..1 progress toward the next rank */
  rankProgress: number
  streak: number
  longestStreak: number
  workoutsCompleted: number
  questsCleared: number
  lifetimeXp: number
  muscleSkills: Record<MuscleGroup, MuscleSkill>
  isPremium: boolean
  workoutType: WorkoutType | null
}

/** Rank order for next-rank lookup and the progression row. */
export const RANK_ORDER: readonly RankLetter[] = ['E', 'D', 'C', 'B', 'A', 'S'] as const

export const RANK_NAMES: Record<RankLetter, string> = {
  E: 'Novice',
  D: 'Apprentice',
  C: 'Journeyman',
  B: 'Expert',
  A: 'Elite',
  S: 'Shadow Monarch',
}

/** Returns the next rank above the given one, or null if S. */
export function nextRank(current: RankLetter): RankLetter | null {
  const i = RANK_ORDER.indexOf(current)
  if (i < 0 || i >= RANK_ORDER.length - 1) return null
  return RANK_ORDER[i + 1] ?? null
}

/**
 * Seed values shown on first launch. Numbers match the design handoff
 * mock so the screen looks right before any real progress is recorded.
 */
export const defaultProfile: HunterProfile = {
  name: 'Hunter',
  level: 7,
  rank: 'E',
  rankProgress: 0.34,
  streak: 7,
  longestStreak: 14,
  workoutsCompleted: 23,
  questsCleared: 38,
  lifetimeXp: 8400,
  muscleSkills: {
    chest: { level: 7, progress: 0.68 },
    back: { level: 4, progress: 0.30 },
    legs: { level: 2, progress: 0.15 },
    cardio: { level: 5, progress: 0.45 },
    shoulders: { level: 1, progress: 0.10 },
    core: { level: 3, progress: 0.25 },
    rest: { level: 0, progress: 0 },
  },
  isPremium: false,
  workoutType: null,
}
