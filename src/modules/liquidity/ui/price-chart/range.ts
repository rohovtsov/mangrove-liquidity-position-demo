import { TokenPrice } from '@/modules/api/entities';
import { useEffect, useMemo, useState } from 'react';

type Grabbing = 'min' | 'max' | null;

interface Result {
  setGrabbing: (grabbing: Grabbing) => void;
  grabbing: Grabbing;
  currentPrice: number;
  min: number;
  max: number;
  rangeMin: number;
  rangeMax: number;
  rangeMinRel: number;
  rangeMaxRel: number;
}

function useGrabbing(): [Grabbing, (grabbing: Grabbing) => void] {
  const [grabbing, setGrabbing] = useState<Grabbing>(null);

  useEffect(() => {
    const listener = () => setGrabbing(null);
    window.addEventListener('mouseup', listener);

    return () => {
      window.removeEventListener('mouseup', listener);
      document.body.classList.remove('grabbing');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('grabbing', grabbing !== null);
  }, [grabbing]);

  return [grabbing, setGrabbing];
}

export function useRange(prices: TokenPrice[]): Result {
  const minPrice = useMemo(() => prices.reduce((min, price) => Math.min(min, price.price), Infinity), [prices]);
  const maxPrice = useMemo(() => prices.reduce((max, price) => Math.max(max, price.price), -Infinity), [prices]);
  const currentPrice = useMemo(() => prices[prices.length - 1].price, [prices]);
  const [grabbing, setGrabbing] = useGrabbing();

  const [min, setMin] = useState(Math.max(currentPrice - (maxPrice - minPrice) * 1, 0));
  const [max, setMax] = useState(currentPrice + (maxPrice - minPrice) * 1);

  const [rangeMin, setRangeMin] = useState(currentPrice - (currentPrice - min) * 0.66);
  const [rangeMax, setRangeMax] = useState(currentPrice + (max - currentPrice) * 0.66);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //setRangeMin(rangeMin - (rangeMax - rangeMin) * 0.001);
      //setRangeMax(rangeMax + (rangeMax - rangeMin) * 0.001);
    }, 16);

    return () => clearTimeout(timeout);
  }, [max, min, rangeMin, rangeMax]);

  return {
    setGrabbing,
    grabbing,
    currentPrice,
    min,
    max,
    rangeMin,
    rangeMax,
    rangeMinRel: (rangeMin - min) / (max - min),
    rangeMaxRel: (rangeMax - min) / (max - min),
  };
}
