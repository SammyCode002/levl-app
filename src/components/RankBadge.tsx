import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors, fonts, radius, RankLetter, rankColors } from '../theme'

interface Props {
  rank: RankLetter
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  style?: ViewStyle
}

const sizes = {
  sm: { box: 22, font: 11 },
  md: { box: 28, font: 14 },
  lg: { box: 44, font: 22 },
} as const

/** Letter rank badge (E to S) in its rank color, with optional glow. */
export function RankBadge({ rank, size = 'md', glow = true, style }: Props) {
  const color = rankColors[rank]
  const { box, font } = sizes[size]
  return (
    <View
      style={[
        styles.box,
        {
          width: box,
          height: box,
          borderRadius: radius.rankBadge,
          borderColor: color,
          shadowColor: color,
          shadowOpacity: glow ? 0.6 : 0,
          shadowRadius: glow ? 6 : 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: glow ? 4 : 0,
        },
        style,
      ]}
    >
      <Text style={[styles.letter, { color, fontSize: font }]}>{rank}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: fonts.orbitronBlack,
    letterSpacing: 1,
  },
})
