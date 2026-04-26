import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SystemWindow } from '../components'
import { colors, type } from '../theme'

interface Props {
  title: string
  emoji: string
}

/** Stub screen used for tabs not yet implemented. */
export function PlaceholderScreen({ title, emoji }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <SystemWindow title={title} accent={colors.purple} glow>
          <Text style={{ fontSize: 48, textAlign: 'center', marginVertical: 12 }}>{emoji}</Text>
          <Text style={[type.body, { color: colors.text, textAlign: 'center' }]}>
            {title} screen is coming soon.
          </Text>
          <Text style={[type.small, { color: colors.textMuted, textAlign: 'center', marginTop: 6 }]}>
            See design_handoff_levl/README.md for the spec.
          </Text>
        </SystemWindow>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: 16, justifyContent: 'center' },
})
