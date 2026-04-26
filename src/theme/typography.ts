/**
 * Font name constants used across the app.
 * Loaded by useFonts() in App.tsx via @expo-google-fonts packages.
 */

export const fonts = {
  // Orbitron weights
  orbitronRegular: 'Orbitron_400Regular',
  orbitronSemiBold: 'Orbitron_600SemiBold',
  orbitronBold: 'Orbitron_700Bold',
  orbitronBlack: 'Orbitron_900Black',

  // Exo 2 weights
  exoLight: 'Exo2_300Light',
  exoRegular: 'Exo2_400Regular',
  exoMedium: 'Exo2_500Medium',
  exoSemiBold: 'Exo2_600SemiBold',
  exoBold: 'Exo2_700Bold',
} as const

/**
 * Pre-built type scale styles. Apply via spread, eg
 *   <Text style={[type.brand, { color: colors.text }]}>LeVl</Text>
 */
export const type = {
  brand: {
    fontFamily: fonts.orbitronBlack,
    fontSize: 38,
    letterSpacing: 5,
  },
  screenTitle: {
    fontFamily: fonts.orbitronBold,
    fontSize: 16,
    letterSpacing: 2,
  },
  sectionLabel: {
    fontFamily: fonts.orbitronRegular,
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  level: {
    fontFamily: fonts.orbitronBlack,
    fontSize: 22,
  },
  body: {
    fontFamily: fonts.exoRegular,
    fontSize: 13,
  },
  bodyBold: {
    fontFamily: fonts.exoSemiBold,
    fontSize: 13,
  },
  small: {
    fontFamily: fonts.exoRegular,
    fontSize: 10,
  },
  xp: {
    fontFamily: fonts.orbitronBold,
    fontSize: 11,
  },
} as const
