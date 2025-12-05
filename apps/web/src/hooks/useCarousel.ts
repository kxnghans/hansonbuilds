import { useState, useCallback } from 'react';
import { PanInfo } from 'framer-motion';

interface UseCarouselOptions {
  count: number;
  initialIndex?: number;
  dragBuffer?: number;
}

export function useCarousel({ count, initialIndex = 0, dragBuffer = 50 }: UseCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const setIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -dragBuffer) {
      next();
    } else if (info.offset.x > dragBuffer) {
      prev();
    }
  }, [dragBuffer, next, prev]);

  const getRelativeIndex = useCallback((index: number) => {
    return (index - (activeIndex % count) + count) % count;
  }, [activeIndex, count]);

  return {
    activeIndex,
    setIndex,
    next,
    prev,
    handleDragEnd,
    getRelativeIndex
  };
}
