import { useEffect, useRef } from "react";

/** Runs a RAF loop, pausing when the tab is hidden. */
export function useAnimationFrame(callback: (time: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId: number;
    let paused = false;

    const loop = (time: number) => {
      if (!paused) callbackRef.current(time);
      rafId = requestAnimationFrame(loop);
    };

    const onVisibilityChange = () => {
      paused = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
}
