import { TokenPrice } from '@/modules/api/entities';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { clamp } from '@/modules/utils/math';

type Grabbing = 'min' | 'max' | null;
type GrabbingState = { grabbing: Grabbing; offsetRel: number; };
type RangeRootRef = RefObject<HTMLDivElement | null>;

interface Result {
  setGrabbing: (grabbing: Grabbing) => void;
  grabbing: Grabbing;
  currentPrice: number;
  min: number;
  max: number;
  rangeMin: number;
  rangeMax: number;
  locked: boolean;
}

function applyGrab(grabbing: Grabbing, offsetRel: number, min: number, max: number, rangeMin: number, rangeMax: number): number {
  if (grabbing === 'min') {
    return clamp(rangeMin + (offsetRel * (max - min)), min, rangeMax);
  } else if (grabbing === 'max') {
    return clamp(rangeMax + (offsetRel * (max - min)), rangeMin, max);
  } else {
    throw new Error('Invalid grabbing');
  }
}

function useLockedState(ms: number): [boolean, (locked: boolean) => void] {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!locked) {
      return;
    }
    const timeoutId = setTimeout(() => setLocked(false), ms);
    return () => clearTimeout(timeoutId);
  }, [locked]);

  return [locked, setLocked];
}

function useGrabbing(rangeRootRef: RangeRootRef): [Grabbing, (grabbing: Grabbing) => void, number, GrabbingState | null] {
  const [grabbing, setGrabbing] = useState<Grabbing>(null);
  const [offset, setOffset] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);
  const [lastGrab, setLastGrab] = useState<GrabbingState | null>(null);
  const relativeOffset = rootHeight > 0 ? (-offset / rootHeight) : 0;

  useEffect(() => {
    const listener = () => setGrabbing(null);
    window.addEventListener('mouseup', listener);

    return () => {
      window.removeEventListener('mouseup', listener);
      document.body.classList.remove('grabbing');
    }
  }, []);

  useEffect(() => {
    if (grabbing === null) {
      return;
    }

    let firstClientY: number | null = null;
    let lastOffset: number | null = null;
    const listener = (e: MouseEvent) => {
      if (firstClientY === null) {
        firstClientY = e.clientY;
        setRootHeight(rangeRootRef.current?.clientHeight ?? 0)
      }

      const offset = e.clientY - firstClientY;
      if (lastOffset !== offset) {
        setOffset(offset);
        lastOffset = offset;
      }
    };

    window.addEventListener('mousemove', listener);
    return () => {
      window.removeEventListener('mousemove', listener);
      setOffset(0);
      setRootHeight(0);
    };
  }, [grabbing]);

  useEffect(() => {
    document.body.classList.toggle('grabbing', grabbing !== null);
  }, [grabbing]);

  useEffect(() => {
    if (grabbing !== null) {
      setLastGrab({ grabbing, offsetRel: relativeOffset });
    }
  }, [grabbing, offset]);

  return [grabbing, setGrabbing, relativeOffset, lastGrab];
}

export function useRange(prices: TokenPrice[], absoluteMax: number, rangeRootRef: RangeRootRef): Result {
  const [locked, setLocked] = useLockedState(500);
  const minPrice = useMemo(() => prices.reduce((min, price) => Math.min(min, price.price), Infinity), [prices]);
  const maxPrice = useMemo(() => prices.reduce((max, price) => Math.max(max, price.price), -Infinity), [prices]);
  const currentPrice = useMemo(() => prices[prices.length - 1].price, [prices]);
  const [grabbing, setGrabbing, grabbingOffsetRel, lastGrab] = useGrabbing(rangeRootRef);

  const [min, setMin] = useState(Math.max(currentPrice - (maxPrice - minPrice), 0));
  const [max, setMax] = useState(Math.min(currentPrice + (maxPrice - minPrice), absoluteMax));

  const [rangeMin, setRangeMin] = useState(currentPrice - (currentPrice - min) * 0.66);
  const [rangeMax, setRangeMax] = useState(currentPrice + (max - currentPrice) * 0.66);

  const actualRangeMin = grabbing === 'min' ? applyGrab('min', grabbingOffsetRel, min, max, rangeMin, rangeMax) : rangeMin;
  const actualRangeMax = grabbing === 'max' ? applyGrab('max', grabbingOffsetRel, min, max, rangeMin, rangeMax) : rangeMax;

  useEffect(() => {
    if (grabbing !== null || lastGrab === null) {
      return;
    }

    if (lastGrab.grabbing === 'max') {
      const actualRangeMax = applyGrab('max', grabbingOffsetRel, min, max, rangeMin, rangeMax);
      setLocked(true);

      const newRange = (actualRangeMax - rangeMin);
      const centerRange = (rangeMin + actualRangeMax) / 2;
      const newMax = centerRange + newRange / 0.66 / 2;
      const newMin = centerRange - newRange / 0.66 / 2;

      setMin(Math.max(newMin, 0));
      setMax(Math.min(newMax, absoluteMax));
      setRangeMax(actualRangeMax);
    } else if (lastGrab.grabbing === 'min') {
      const actualRangeMin = applyGrab('min', grabbingOffsetRel, min, max, rangeMin, rangeMax);
      setLocked(true);
      const newRange = (rangeMax - actualRangeMin);
      const centerRange = (rangeMax + actualRangeMin) / 2;
      const newMax = centerRange + newRange / 0.66 / 2;
      const newMin = centerRange - newRange / 0.66 / 2;

      setMin(Math.max(newMin, 0));
      setMax(Math.min(newMax, absoluteMax));
      setRangeMin(actualRangeMin);
    }
  }, [grabbing, lastGrab]);

  return {
    setGrabbing,
    grabbing,
    currentPrice,
    min,
    max,
    rangeMin: actualRangeMin,
    rangeMax: actualRangeMax,
    locked,
  };
}
