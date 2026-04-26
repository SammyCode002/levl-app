/**
 * Color tokens from design handoff.
 * Pulled directly from design_handoff_levl/README.md.
 */

export const colors = {
  // Surfaces
  bg: '#07070f',
  bgCard: '#0d0d1a',
  bgWindow: '#0d0d20',
  bgWindowAlt: '#080812',

  // Borders
  border: '#1a2040',
  borderGlow: '#2a4fff',

  // Accent palette
  blue: '#3d8bff',
  purple: '#8b5fff',
  cyan: '#00d4ff',
  green: '#00ff88',
  yellow: '#ffd700',
  red: '#ff4466',
  orange: '#ff8c00',

  // Text
  text: '#e8eeff',
  textMuted: '#6070a0',
  textDim: '#3a4060',

  // Solid black with transparency for overlays
  overlayBackdrop: '#000000dd',
} as const

export const rankColors = {
  E: '#888888', // Novice
  D: '#5fa8ff', // Apprentice
  C: '#a0ff60', // Journeyman
  B: '#ffaa00', // Expert
  A: '#ff6688', // Elite
  S: '#c060ff', // Shadow Monarch
} as const

export const muscleColors = {
  chest: colors.blue,
  back: colors.purple,
  legs: colors.red,
  cardio: colors.cyan,
  shoulders: colors.orange,
  core: colors.green,
  rest: colors.textDim,
} as const

export type RankLetter = keyof typeof rankColors
export type MuscleGroup = keyof typeof muscleColors
