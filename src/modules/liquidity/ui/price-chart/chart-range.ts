import { TokenPrice } from '@/modules/api/entities';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { clamp } from '@/modules/utils/math';
import { MinMaxState, SetMinMaxStateFn } from '@/modules/liquidity/state/min-max-state';

type Grabbing = 'min' | 'max' | null;
type GrabbingState = { grabbing: Grabbing; offsetRel: number; };
type RangeRootRef = RefObject<HTMLDivElement | null>;

type Result = {
  setGrabbing: (grabbing: Grabbing) => void;
  grabbing: Grabbing;
  currentPrice: number;
  locked: boolean;
} & MinMaxState;

function applyGrab(grabbing: Grabbing, offsetRel: number, min: number, max: number, rangeMin: number, rangeMax: number): number {
  if (grabbing === 'min') {
    return clamp(rangeMin + (offsetRel * (max - min)), min, rangeMax);
  } else if (grabbing === 'max') {
    return clamp(rangeMax + (offsetRel * (max - min)), rangeMin, max);
  } else {
    throw new Error('Invalid grabbing');
  }
}

function applyLastGrab(lastGrab: GrabbingState, grabbingOffsetRel: number, minMax: MinMaxState): Partial<MinMaxState> {
  let actualRangeMin: number | null = null;
  let actualRangeMax: number | null = null;
  let centerRange = 0;
  let newRange = 0;

  if (lastGrab.grabbing === 'max') {
    actualRangeMax = applyGrab('max', grabbingOffsetRel, minMax.min, minMax.max, minMax.rangeMin, minMax.rangeMax);
    newRange = (actualRangeMax - minMax.rangeMin);
    centerRange = (minMax.rangeMin + actualRangeMax) / 2;
  } else if (lastGrab.grabbing === 'min') {
    actualRangeMin = applyGrab('min', grabbingOffsetRel, minMax.min, minMax.max, minMax.rangeMin, minMax.rangeMax);
    newRange = (minMax.rangeMax - actualRangeMin);
    centerRange = (minMax.rangeMax + actualRangeMin) / 2;
  }

  const newMax = Math.min(centerRange + newRange / 0.66 / 2, minMax.absoluteMax);
  const newMin = Math.max(centerRange - newRange / 0.66 / 2, minMax.absoluteMin);

  if (actualRangeMax) {
    return { min: newMin, max: newMax, rangeMax: actualRangeMax };
  } else if (actualRangeMin) {
    return { min: newMin, max: newMax, rangeMin: actualRangeMin };
  } else {
    throw new Error('Invalid range');
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
  }, [locked, ms]);

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
  }, [grabbing, rangeRootRef]);

  useEffect(() => {
    document.body.classList.toggle('grabbing', grabbing !== null);
  }, [grabbing]);

  useEffect(() => {
    if (grabbing !== null) {
      setLastGrab({ grabbing, offsetRel: relativeOffset });
    }
  }, [grabbing, relativeOffset]);

  return [grabbing, setGrabbing, relativeOffset, lastGrab];
}

export function useChartRange(prices: TokenPrice[], minMax: MinMaxState, setMinMax: SetMinMaxStateFn, rangeRootRef: RangeRootRef): Result {
  const [locked, setLocked] = useLockedState(500);
  const currentPrice = useMemo(() => prices[prices.length - 1].price, [prices]);
  const [grabbing, setGrabbing, grabbingOffsetRel, lastGrab] = useGrabbing(rangeRootRef);

  const actualRangeMin = grabbing === 'min' ? applyGrab('min', grabbingOffsetRel, minMax.min, minMax.max, minMax.rangeMin, minMax.rangeMax) : minMax.rangeMin;
  const actualRangeMax = grabbing === 'max' ? applyGrab('max', grabbingOffsetRel, minMax.min, minMax.max, minMax.rangeMin, minMax.rangeMax) : minMax.rangeMax;

  useEffect(() => {
    if (grabbing !== null || lastGrab === null) {
      return;
    }

    setLocked(true);
    setMinMax(applyLastGrab(lastGrab, grabbingOffsetRel, minMax));
    // eslint-disable-next-line
  }, [grabbing, lastGrab]);

  return {
    ...minMax,
    rangeMin: actualRangeMin,
    rangeMax: actualRangeMax,
    setGrabbing,
    grabbing,
    currentPrice,
    locked,
  };
}
