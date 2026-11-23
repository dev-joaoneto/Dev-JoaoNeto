import { useEffect, useState } from 'react'

// efeitos pesados só em tela >= minWidth e sem "reduzir movimento" no sistema
export function useMotionOk(minWidth = 0) {
  const query = `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`
  const [ok, setOk] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setOk(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return ok
}
