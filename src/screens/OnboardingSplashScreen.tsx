import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlowButton, SystemWindow } from '../components'
import { colors, fonts, type } from '../theme'

interface Props {
  onContinue: () => void
}

/**
 * Onboarding step 1. Splash with system alert and brand lockup.
 * The system alert window fades in after a 500ms delay.
 */
export function OnboardingSplashScreen({ onContinue }: Props) {
  const fade = useRef(new Animated.Value(0)).current
  const slide = useRef(new Animated.Value(-20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, delay: 500, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 500, delay: 500, useNativeDriver: true }),
    ]).start()
  }, [fade, slide])

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }], width: '100%' }}>
          <SystemWindow title="System Message" accent={colors.blue} glow>
            <Text style={[type.sectionLabel, { color: colors.cyan, textAlign: 'center', marginBottom: 6 }]}>
              SYSTEM ALERT
            </Text>
            <Text style={[type.body, { color: colors.text, textAlign: 'center' }]}>
              A new hunter has been detected.
            </Text>
            <Text style={[type.body, { color: colors.yellow, textAlign: 'center' }]}>
              Beginning fitness assessment...
            </Text>
          </SystemWindow>
        </Animated.View>

        <View style={styles.brand}>
          <Text style={[type.brand, { color: colors.text }]}>LeVl</Text>
          <Text style={[styles.tagline]}>ARISE. TRAIN. EVOLVE.</Text>
        </View>

        <GlowButton label="Begin Your Journey" onPress={onContinue} pulse style={{ width: '100%' }} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brand: {
    alignItems: 'center',
    gap: 6,
  },
  tagline: {
    fontFamily: fonts.exoRegular,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 3,
  },
})
