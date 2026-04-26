import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlowButton, SystemWindow } from '../components'
import { colors, fonts, radius, type } from '../theme'

type WorkoutType = 'weights' | 'bodyweight' | 'hybrid'

interface Option {
  id: WorkoutType
  emoji: string
  label: string
  description: string
}

const options: Option[] = [
  { id: 'weights', emoji: '🏋️', label: 'Weights Only', description: 'Barbells, dumbbells, machines.' },
  { id: 'bodyweight', emoji: '⚡', label: 'Bodyweight', description: 'No equipment needed.' },
  { id: 'hybrid', emoji: '🔥', label: 'Hybrid', description: 'Best of both worlds.' },
]

interface Props {
  onConfirm: (type: WorkoutType) => void
}

/** Onboarding step 2. User picks a workout style. */
export function OnboardingTypeScreen({ onConfirm }: Props) {
  const [selected, setSelected] = useState<WorkoutType | null>(null)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[type.sectionLabel, { color: colors.blue }]}>SELECT TRAINING PATH</Text>
        <Text style={[styles.heading]}>Choose Your Style</Text>

        {options.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <Pressable
              key={opt.id}
              onPress={() => setSelected(opt.id)}
              style={[
                styles.card,
                isSelected && {
                  borderColor: colors.blue,
                  shadowColor: colors.blue,
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 0 },
                  elevation: 6,
                },
              ]}
            >
              <Text style={styles.emoji}>{opt.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardLabel, isSelected && { color: colors.blue }]}>{opt.label}</Text>
                <Text style={styles.cardDesc}>{opt.description}</Text>
              </View>
              {isSelected && (
                <View style={styles.check}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </Pressable>
          )
        })}

        <SystemWindow accent={colors.blue}>
          <Text style={[type.body, { color: colors.textMuted, textAlign: 'center' }]}>
            All hunters begin at Rank E. Complete daily quests to climb toward Rank S, the Shadow Monarch.
          </Text>
        </SystemWindow>

        <GlowButton
          label="Confirm & Arise →"
          onPress={() => selected && onConfirm(selected)}
          disabled={!selected}
          pulse={!!selected}
          style={{ marginTop: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    padding: 18,
    gap: 14,
  },
  heading: {
    fontFamily: fonts.exoBold,
    fontSize: 17,
    color: colors.text,
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
  },
  emoji: {
    fontSize: 26,
  },
  cardLabel: {
    fontFamily: fonts.orbitronBold,
    fontSize: 13,
    color: colors.text,
    letterSpacing: 1,
  },
  cardDesc: {
    fontFamily: fonts.exoRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 12,
  },
})
