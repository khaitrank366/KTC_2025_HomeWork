import { useEffect, useState } from 'react'

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

export function useClock() {
  const [time, setTime] = useState(getCurrentTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return time
}
