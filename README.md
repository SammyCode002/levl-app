# LeVl

> Solo Leveling themed fitness app. Daily quest checklists, XP, muscle skill levels, and rank progression from E to S.

Built with **Expo + React Native + TypeScript**.

## Status

Early scaffolding. The onboarding flow and the Quests (Home) tab are functional. Calendar, Workout, Meals, and Profile tabs are placeholder stubs that will be filled in next.

## Stack

- Expo SDK 54
- React Native 0.81 with React 19
- TypeScript
- React Navigation (bottom tabs)
- Orbitron and Exo 2 from Google Fonts (`@expo-google-fonts/*`)
- `expo-linear-gradient` for the system-window backdrops
- `@react-native-async-storage/async-storage` for local persistence

## Project Structure

```
levl-app/
  App.tsx                       App entry, font loading, onboarding gate
  app.json                      Expo config (dark theme, brand bg)
  src/
    theme/
      colors.ts                 Surfaces, accents, rank colors, muscle colors
      typography.ts             Font families and the type scale
      spacing.ts                Spacing and radius tokens
      index.ts                  Barrel
    components/
      SystemWindow.tsx          Dark gradient card with optional title bar and glow
      GlowButton.tsx            Pulsing branded CTA
      XpBar.tsx                 Pill XP progress bar
      RankBadge.tsx             Letter rank badge in rank color
    screens/
      OnboardingSplashScreen.tsx
      OnboardingTypeScreen.tsx
      HomeScreen.tsx            Daily quests with toggle and XP rollup
      PlaceholderScreen.tsx     Used by tabs not yet built
    navigation/
      BottomTabs.tsx            5 tab navigator
```

## Run Locally

```bash
npm install
npm run start
```

Then press `i` for iOS simulator, `a` for Android, or scan the QR with Expo Go on your device. Web works too with `npm run web`.

## Design Reference

The full design handoff lives in `Fitness app idea Brainstorm/design_handoff_levl/` outside this repo. It contains the HTML prototype and the README with all screens, design tokens, copy, and animations.

### Live Prototype Preview

Browse the original interactive HTML prototype here:

[LeVl App prototype (preview)](https://bf54c4d6-50c3-43df-8aa7-31a39b503e0d.claudeusercontent.com/v1/design/projects/bf54c4d6-50c3-43df-8aa7-31a39b503e0d/serve/LeVl%20App-print.html?t=0dcd5b4db9dc7a2730c2e01e46465557ab61912c22126ae48e642068bb4b6b8a.7b40fadc-85a2-4890-a6b1-81ae6051405e.fca5f651-c263-4ff7-9b5c-8583f1a48123.1777235051)

> Note: this preview link is signed and may expire or rotate. The local copy at `Fitness app idea Brainstorm/design_handoff_levl/LeVl App.html` is the canonical source.

## Roadmap

- [x] Onboarding splash and workout-type selection
- [x] Bottom tab navigation
- [x] Quests / Home screen with checkable quests and XP bar
- [ ] Workout screen with expandable exercise sets
- [ ] Calendar with weekly grid and muscle XP
- [ ] Meals with locked premium cards
- [ ] Profile with rank progression and skill levels
- [ ] Rank Up overlay (full screen modal with particles)
- [ ] Paywall bottom sheet
- [ ] AsyncStorage persistence for quests, XP, and onboarding flag
- [ ] RevenueCat integration for the real subscription flow

## License

Personal project. All rights reserved.
