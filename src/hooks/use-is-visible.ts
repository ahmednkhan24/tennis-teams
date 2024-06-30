import { RefObject } from 'react';
import { useIntersection } from 'react-use';

export function useIsVisible(ref: RefObject<HTMLElement>) {
  const intersectionObserver = useIntersection(ref, {
    threshold: 1.0,
    rootMargin: '-20% 0% -20% 0%',
  });

  return intersectionObserver?.isIntersecting ?? false;
}
