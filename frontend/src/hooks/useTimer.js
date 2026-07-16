// src/hooks/useTimer.js
import { useEffect, useRef, useState } from 'react';

export function useTimer(initialSeconds, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpireRef.current?.();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  function reset(newSeconds) {
    setSecondsLeft(newSeconds ?? initialSeconds);
  }

  return { secondsLeft, reset };
}
