import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, radius, type } from '../theme'

interface Props {
  label: string
  onPress?: () => void
  /** Accent color for border and glow. Defaults to brand blue. */
  accent?: string
  /** Whether the button continuously pulses. Used on primary CTAs. */
  pulse?: boolean
  disabled?: boolean
  style?: ViewStyle
}

/**
 * Branded CTA button with optional 2s pulse-glow animation.
 * Disabled state mutes color and removes glow.
 */
export function GlowButton({ label, onPress, accent = colors.blue, pulse = false, disabled = false, style }: Props) {
  const glow = useRef(new Animated.Value(8)).current

  useEffect(() => {
    if (!pulse || disabled) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 16, duration: 1000, useNativeDriver: false }),
        Animated.timing(glow, { toValue: 8, duration: 1000, useNativeDriver: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [pulse, disabled, glow])

  const tint = disabled ? colors.textDim : accent

  return (
    <Pressable onPress={disabled ? undefined : onPress} style={style}>
      <Animated.View
        style={[
          styles.outer,
          {
            borderColor: tint,
            shadowColor: tint,
            shadowRadius: glow,
            shadowOpacity: disabled ? 0 : 0.6,
            shadowOffset: { width: 0, height: 0 },
            elevation: disabled ? 0 : 4,
          },
        ]}
      >
        <LinearGradient
          colors={['#0d0d20', '#08081a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inner}
        >
          <Text style={[type.bodyBold, styles.label, { color: tint, fontFamily: 'Orbitron_700Bold', fontSize: 12, letterSpacing: 2 }]}>
            {label}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radius.button,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inner: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
  },
})
