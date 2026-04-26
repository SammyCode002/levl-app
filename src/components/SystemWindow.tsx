import { ReactNode } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, radius, spacing, type } from '../theme'

interface Props {
  /** Optional title bar label, eg "System Message". */
  title?: string
  /** Color of the title-bar dot and glow. Defaults to brand blue. */
  accent?: string
  /** Whether to render the glowing accent border. */
  glow?: boolean
  children: ReactNode
  style?: ViewStyle
}

/**
 * System window card. The base container used across the app.
 * Dark gradient background, optional title bar, optional glow border.
 */
export function SystemWindow({ title, accent = colors.blue, glow = false, children, style }: Props) {
  return (
    <View
      style={[
        styles.outer,
        glow && {
          borderColor: accent,
          shadowColor: accent,
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 0 },
          elevation: 6,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={['#0d0d20ee', '#080812ee']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {title && (
          <View style={styles.titleBar}>
            <View style={[styles.dot, { backgroundColor: accent, shadowColor: accent }]} />
            <Text style={[type.sectionLabel, { color: accent }]}>{title}</Text>
          </View>
        )}
        <View style={styles.body}>{children}</View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  gradient: {
    padding: spacing.cardPad,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  body: {},
})
