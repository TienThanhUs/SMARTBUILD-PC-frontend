import { useCallback, useEffect, useState } from 'react'

// Runs `request` on mount and whenever `deps` change. Returns
// { data, loading, error, reload } so pages only render the states.
export function useApi(request, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    setState((prev) => ({ ...prev, loading: true, error: null }))
    request()
      .then((data) => {
        if (!ignore) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (!ignore) setState({ data: null, loading: false, error })
      })
    return () => {
      ignore = true
    }
  }, [...deps, attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])

  return { ...state, reload }
}
