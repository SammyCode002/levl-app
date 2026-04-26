import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { HomeScreen, PlaceholderScreen } from '../screens'
import { colors, fonts } from '../theme'

const Tab = createBottomTabNavigator()

const tabIcons: Record<string, string> = {
  Quests: '⚡',
  Calendar: '📅',
  Workout: '💪',
  Meals: '🍽️',
  Profile: '👤',
}

/** Bottom tab navigator. Quests is fully built; the rest are placeholders for now. */
export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: fonts.orbitronRegular,
          fontSize: 9,
          letterSpacing: 1,
        },
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{tabIcons[route.name] ?? '·'}</Text>
        ),
      })}
    >
      <Tab.Screen name="Quests" component={HomeScreen} />
      <Tab.Screen name="Calendar">
        {() => <PlaceholderScreen title="Calendar" emoji="📅" />}
      </Tab.Screen>
      <Tab.Screen name="Workout">
        {() => <PlaceholderScreen title="Workout" emoji="💪" />}
      </Tab.Screen>
      <Tab.Screen name="Meals">
        {() => <PlaceholderScreen title="Meals" emoji="🍽️" />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <PlaceholderScreen title="Profile" emoji="👤" />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
