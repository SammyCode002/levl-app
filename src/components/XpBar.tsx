import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors, radius } from '../theme'

interface Props {
  /** Current XP. */
  value: number
  /** Max XP for this level. */
  max: number
  /** Bar fill color. Defaults to yellow. */
  color?: string
  /** Bar height in px. Defaults to 7. */
  height?: number
  /** Whether to render the colored glow. */
  glow?: boolean
  style?: ViewStyle
}

/** Pill-shaped XP progress bar with optional glow. */
export function XpBar({ value, max, color = colors.yellow, height = 7, glow = true, style }: Props) {
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0))
  return (
    <View style={[styles.track, { height, borderRadius: radius.xpBar }, style]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            width: `${pct * 100}%`,
            borderRadius: radius.xpBar,
            shadowColor: color,
            shadowOpacity: glow ? 0.6 : 0,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
})
