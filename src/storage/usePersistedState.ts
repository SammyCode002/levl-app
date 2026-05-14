import { useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY_PREFIX = 'levl:'

type Setter<T> = (next: T | ((prev: T) => T)) => void

/**
 * useState-shaped hook that mirrors its value to AsyncStorage.
 * Writes are skipped until the first read completes so the
 * default value never clobbers stored data on first render.
 *
 * Returns [value, setValue, hydrated]. Gate UI on `hydrated`
 * when showing a fresh default would flash (eg onboarding).
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
): [T, Setter<T>, boolean] {
  const [value, setValueState] = useState<T>(defaultValue)
  const [hydrated, setHydrated] = useState(false)
  const hydratedRef = useRef(false)
  const fullKey = KEY_PREFIX + key

  useEffect(() => {
    let cancelled = false
    AsyncStorage.getItem(fullKey)
      .then((raw) => {
        if (cancelled) return
        if (raw !== null) {
          try {
            setValueState(JSON.parse(raw) as T)
          } catch {
            // bad JSON falls through to default
          }
        }
        hydratedRef.current = true
        setHydrated(true)
      })
      .catch(() => {
        if (cancelled) return
        hydratedRef.current = true
        setHydrated(true)
      })
    return () => {
      cancelled = true
    }
  }, [fullKey])

  const setValue = useCallback<Setter<T>>(
    (next) => {
      setValueState((prev) => {
        const resolved =
          typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        if (hydratedRef.current) {
          AsyncStorage.setItem(fullKey, JSON.stringify(resolved)).catch(() => {})
        }
        return resolved
      })
    },
    [fullKey],
  )

  return [value, setValue, hydrated]
}
