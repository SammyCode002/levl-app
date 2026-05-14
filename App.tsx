import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {
  Orbitron_400Regular,
  Orbitron_600SemiBold,
  Orbitron_700Bold,
  Orbitron_900Black,
  useFonts as useOrbitron,
} from '@expo-google-fonts/orbitron'
import {
  Exo2_300Light,
  Exo2_400Regular,
  Exo2_500Medium,
  Exo2_600SemiBold,
  Exo2_700Bold,
} from '@expo-google-fonts/exo-2'
import { OnboardingSplashScreen, OnboardingTypeScreen } from './src/screens'
import { BottomTabs } from './src/navigation/BottomTabs'
import { colors } from './src/theme'
import { defaultProfile, usePersistedState, type HunterProfile } from './src/storage'

type OnboardStep = 'splash' | 'type'

export default function App() {
  const [step, setStep] = useState<OnboardStep>('splash')
  const [onboarded, setOnboarded, onboardedHydrated] = usePersistedState<boolean>(
    'onboarded',
    false,
  )
  const [, setProfile, profileHydrated] = usePersistedState<HunterProfile>(
    'profile',
    defaultProfile,
  )

  const [fontsLoaded] = useOrbitron({
    Orbitron_400Regular,
    Orbitron_600SemiBold,
    Orbitron_700Bold,
    Orbitron_900Black,
    Exo2_300Light,
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,
    Exo2_700Bold,
  })

  const ready = fontsLoaded && onboardedHydrated && profileHydrated

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.blue} />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {!onboarded && step === 'splash' && (
        <OnboardingSplashScreen onContinue={() => setStep('type')} />
      )}
      {!onboarded && step === 'type' && (
        <OnboardingTypeScreen
          onConfirm={(type) => {
            setProfile((prev) => ({ ...prev, workoutType: type }))
            setOnboarded(true)
          }}
        />
      )}
      {onboarded && (
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
