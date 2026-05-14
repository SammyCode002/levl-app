import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RankBadge, SystemWindow, XpBar } from '../components'
import {
  defaultProfile,
  nextRank,
  RANK_NAMES,
  RANK_ORDER,
  usePersistedState,
  type HunterProfile,
} from '../storage'
import {
  colors,
  fonts,
  muscleColors,
  radius,
  rankColors,
  spacing,
  type,
  type MuscleGroup,
} from '../theme'

const SKILL_ORDER: { key: MuscleGroup; label: string }[] = [
  { key: 'chest', label: 'Chest' },
  { key: 'back', label: 'Back' },
  { key: 'legs', label: 'Legs' },
  { key: 'shoulders', label: 'Shoulders' },
  { key: 'cardio', label: 'Cardio' },
  { key: 'core', label: 'Core' },
]

/**
 * Picks the highest-level muscle skill and labels the hunter
 * as a specialist in that group ("Chest Specialist", etc).
 */
function getSpecialty(profile: HunterProfile): string {
  let topKey: MuscleGroup = 'chest'
  let topLevel = -1
  for (const { key } of SKILL_ORDER) {
    const lvl = profile.muscleSkills[key]?.level ?? 0
    if (lvl > topLevel) {
      topLevel = lvl
      topKey = key
    }
  }
  return topKey.charAt(0).toUpperCase() + topKey.slice(1) + ' Specialist'
}

export function ProfileScreen() {
  const [profile, setProfile] = usePersistedState<HunterProfile>('profile', defaultProfile)

  const upcoming = nextRank(profile.rank)
  const specialty = getSpecialty(profile)
  const rankPct = Math.round(profile.rankProgress * 100)

  function openPaywall() {
    // Paywall not built yet. Hook it in once the bottom-sheet exists.
  }

  function togglePremium() {
    setProfile((prev) => ({ ...prev, isPremium: !prev.isPremium }))
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.nav}>
        <Text style={[type.screenTitle, { color: colors.text }]}>PROFILE</Text>
        <View style={styles.navRight}>
          <Text style={styles.streak}>🔥 {profile.streak}</Text>
          <RankBadge rank={profile.rank} size="sm" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Profile card */}
        <SystemWindow accent={colors.purple} glow>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>⚡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[type.screenTitle, { color: colors.text, fontSize: 15 }]}>
                {profile.name}
              </Text>
              <Text style={[type.small, { color: colors.textMuted, marginTop: 2 }]}>
                {specialty} · LVL {profile.level}
              </Text>
              <View style={styles.rankRow}>
                <RankBadge rank={profile.rank} size="sm" />
                {upcoming && (
                  <Text style={[type.small, { color: rankColors[upcoming] }]}>
                    → Rank {upcoming}
                  </Text>
                )}
              </View>
            </View>
            {profile.isPremium ? (
              <Pressable onPress={togglePremium} style={[styles.planPill, styles.premiumPill]}>
                <Text style={[styles.planText, { color: colors.yellow }]}>PREMIUM ⭐</Text>
              </Pressable>
            ) : (
              <Pressable onPress={openPaywall} style={styles.planPill}>
                <Text style={styles.planText}>FREE PLAN</Text>
              </Pressable>
            )}
          </View>
        </SystemWindow>

        {/* Rank progression */}
        <SystemWindow title="Rank Progression" accent={colors.blue}>
          <View style={styles.rankRowProgress}>
            {RANK_ORDER.map((r, i) => {
              const reachedIdx = RANK_ORDER.indexOf(profile.rank)
              const reached = i <= reachedIdx
              return (
                <View key={r} style={styles.rankNode}>
                  <RankBadge rank={r} size="sm" glow={reached} />
                  {i < RANK_ORDER.length - 1 && (
                    <View
                      style={[
                        styles.connector,
                        {
                          backgroundColor:
                            i < reachedIdx
                              ? rankColors[r]
                              : i === reachedIdx
                              ? colors.borderGlow
                              : colors.border,
                        },
                      ]}
                    />
                  )}
                </View>
              )
            })}
          </View>
          {upcoming && (
            <>
              <View style={styles.rankLabelRow}>
                <Text style={[type.small, { color: colors.textMuted }]}>
                  Progress to Rank {upcoming}
                </Text>
                <Text style={[type.xp, { color: colors.blue }]}>{rankPct}%</Text>
              </View>
              <XpBar
                value={profile.rankProgress}
                max={1}
                color={colors.blue}
                height={6}
                style={{ marginTop: 6 }}
              />
              <Text style={[type.small, { color: colors.textDim, marginTop: 6 }]}>
                {RANK_NAMES[upcoming]}
              </Text>
            </>
          )}
        </SystemWindow>

        {/* Skill levels */}
        <SystemWindow title="Skill Levels" accent={colors.green}>
          <View style={{ gap: 10 }}>
            {SKILL_ORDER.map(({ key, label }) => {
              const skill = profile.muscleSkills[key]
              const color = muscleColors[key]
              return (
                <View key={key}>
                  <View style={styles.skillRow}>
                    <Text style={[type.body, { color: colors.textMuted }]}>{label}</Text>
                    <Text style={[type.xp, { color, fontFamily: fonts.orbitronBold }]}>
                      LVL {skill.level}
                    </Text>
                  </View>
                  <XpBar
                    value={skill.progress}
                    max={1}
                    color={color}
                    height={5}
                    style={{ marginTop: 4 }}
                  />
                </View>
              )
            })}
          </View>
        </SystemWindow>

        {/* Statistics */}
        <SystemWindow title="Statistics" accent={colors.yellow}>
          <View style={{ gap: 8 }}>
            <StatRow label="Total Workouts" value={String(profile.workoutsCompleted)} color={colors.blue} />
            <StatRow label="Current Streak" value={`${profile.streak} 🔥`} color={colors.yellow} />
            <StatRow label="Total XP" value={profile.lifetimeXp.toLocaleString()} color={colors.green} />
            <StatRow label="Quests Cleared" value={String(profile.questsCleared)} color={colors.cyan} />
            <StatRow label="Longest Streak" value={String(profile.longestStreak)} color={colors.purple} />
          </View>
        </SystemWindow>

        <View style={{ height: 8 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

interface StatRowProps {
  label: string
  value: string
  color: string
}

function StatRow({ label, value, color }: StatRowProps) {
  return (
    <View style={styles.statRow}>
      <Text style={[type.body, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[type.xp, { color, fontSize: 13 }]}>{value}</Text>
    </View>
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

  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.purple,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.purple,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  avatarEmoji: { fontSize: 24 },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  planPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  premiumPill: { borderColor: colors.yellow, backgroundColor: '#ffd7001a' },
  planText: { color: colors.textMuted, fontFamily: fonts.orbitronBold, fontSize: 10, letterSpacing: 1 },

  rankRowProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rankNode: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  connector: { flex: 1, height: 2, marginHorizontal: 4, borderRadius: 1 },
  rankLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
})
