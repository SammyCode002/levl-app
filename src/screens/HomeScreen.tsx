import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RankBadge, SystemWindow, XpBar } from '../components'
import { colors, fonts, radius, spacing, type } from '../theme'

interface Quest {
  id: string
  label: string
  muscle: string
  xp: number
  done: boolean
}

const initialQuests: Quest[] = [
  { id: '1', label: 'Bench Press 4x8', muscle: 'Chest', xp: 120, done: false },
  { id: '2', label: 'Incline Dumbbell Press 3x10', muscle: 'Chest', xp: 100, done: false },
  { id: '3', label: 'Push-ups 3x15', muscle: 'Chest', xp: 60, done: false },
  { id: '4', label: 'Cable Fly 3x12', muscle: 'Chest', xp: 80, done: false },
  { id: '5', label: '10 min Warmup Jog', muscle: 'Cardio', xp: 50, done: false },
]

const MAX_XP = 1000

/**
 * Home / Daily Quests screen.
 * Tap quests to toggle complete. XP totals roll up the bar.
 */
export function HomeScreen() {
  const [quests, setQuests] = useState(initialQuests)
  const xp = quests.filter((q) => q.done).reduce((sum, q) => sum + q.xp, 340)
  const completedCount = quests.filter((q) => q.done).length

  function toggle(id: string) {
    setQuests((prev) => prev.map((q) => (q.id === id ? { ...q, done: !q.done } : q)))
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.nav}>
        <Text style={[type.brand, { fontSize: 17, color: colors.text, letterSpacing: 3 }]}>LeVl</Text>
        <View style={styles.navRight}>
          <Text style={styles.streak}>🔥 7</Text>
          <RankBadge rank="E" size="sm" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <SystemWindow title="Hunter Status" accent={colors.yellow} glow>
          <View style={styles.statusRow}>
            <View>
              <Text style={[type.level, { color: colors.text }]}>LVL 7</Text>
              <Text style={[type.small, { color: colors.textMuted, marginTop: 2 }]}>
                Chest Specialist · Rank E
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[type.body, { color: colors.yellow, fontFamily: fonts.orbitronBold }]}>
                {xp} / {MAX_XP} XP
              </Text>
              <Text style={[type.small, { color: colors.textMuted, marginTop: 2 }]}>
                {Math.max(0, MAX_XP - xp)} to next level
              </Text>
            </View>
          </View>
          <XpBar value={xp} max={MAX_XP} color={colors.yellow} style={{ marginTop: 10 }} />
        </SystemWindow>

        <View style={styles.questHeader}>
          <Text style={[type.sectionLabel, { color: colors.blue }]}>DAILY QUESTS</Text>
          <Text style={[type.sectionLabel, { color: completedCount === quests.length ? colors.green : colors.textMuted }]}>
            {completedCount} / {quests.length}
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          {quests.map((q) => (
            <Pressable
              key={q.id}
              onPress={() => toggle(q.id)}
              style={[
                styles.quest,
                q.done && { backgroundColor: '#00ff880d', borderColor: colors.green },
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  q.done && { backgroundColor: colors.green, borderColor: colors.green },
                ]}
              >
                {q.done && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    type.bodyBold,
                    {
                      color: colors.text,
                      textDecorationLine: q.done ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {q.label}
                </Text>
                <Text style={[type.small, { color: colors.textMuted, marginTop: 2 }]}>{q.muscle}</Text>
              </View>
              <Text style={[styles.xpReward]}>+{q.xp} XP</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.statsRow}>
          {[
            { emoji: '🔥', value: '7', label: 'Streak' },
            { emoji: '💪', value: '23', label: 'Workouts' },
            { emoji: '⚡', value: '8.4k', label: 'Total XP' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={{ fontSize: 18 }}>{s.emoji}</Text>
              <Text style={[type.bodyBold, { color: colors.text, marginTop: 4 }]}>{s.value}</Text>
              <Text style={[type.small, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenH,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streak: { color: colors.yellow, fontFamily: fonts.orbitronBold, fontSize: 12 },
  body: { padding: 12, gap: 12, paddingBottom: 32 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quest: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.bgCard,
    borderRadius: radius.questRow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: colors.bg, fontSize: 12, fontWeight: '900' },
  xpReward: {
    color: colors.yellow,
    fontFamily: fonts.orbitronBold,
    fontSize: 11,
  },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  statCard: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    alignItems: 'center',
  },
})
