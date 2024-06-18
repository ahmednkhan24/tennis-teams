import { EffectCallback, useEffect } from 'react';

export function useComponentFirstMount(effect: EffectCallback) {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
