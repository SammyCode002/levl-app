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

type OnboardStep = 'splash' | 'type' | 'done'

export default function App() {
  const [step, setStep] = useState<OnboardStep>('splash')
  const [, setWorkoutType] = useState<'weights' | 'bodyweight' | 'hybrid' | null>(null)

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

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.blue} />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {step === 'splash' && <OnboardingSplashScreen onContinue={() => setStep('type')} />}
      {step === 'type' && (
        <OnboardingTypeScreen
          onConfirm={(type) => {
            setWorkoutType(type)
            setStep('done')
          }}
        />
      )}
      {step === 'done' && (
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
