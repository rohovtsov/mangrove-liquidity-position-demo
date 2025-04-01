'use client';
import { useCallback, useEffect, useState } from 'react';
import { applyRangeMinMaxChange, MinMaxState, SetMinMaxStateFn } from '@/modules/liquidity/state/min-max-state';
import NumberInput from '@/modules/liquidity/ui/number-input/number-input.component';

interface Props {
  mode: 'min' | 'max';
  minMax: MinMaxState;
  setMinMax: SetMinMaxStateFn;
}

function validRangeMinMaxChange(mode: 'min' | 'max', n: number, minMax: MinMaxState): boolean {
  const newMinMax = applyRangeMinMaxChange(mode, n, minMax);

  if (mode === 'min') {
    return newMinMax.rangeMin === n;
  } else {
    return newMinMax.rangeMax === n;
  }
}

export default function MinMaxInput({ mode, minMax, setMinMax }: Props) {
  const [inputValue, setInputValue] = useState<number>(0);

  useEffect(() => {
    const value = Number((mode === 'min' ? minMax.rangeMin : minMax.rangeMax).toFixed(2));
    setInputValue(value);
  }, [minMax, mode]);

  const handleInputChange = useCallback((n: number) => {
    setInputValue(n);

    if (!validRangeMinMaxChange(mode, n, minMax)) {
      return;
    }

    setMinMax(applyRangeMinMaxChange(mode, n, minMax))
  }, [minMax, mode, setMinMax]);

  const handleInputBlur = useCallback(() => {
    const value = Number((mode === 'min' ? minMax.rangeMin : minMax.rangeMax).toFixed(2));
    setInputValue(value);
  }, [minMax, mode]);

  return (
    <NumberInput
      label={mode === 'min' ? 'Min Price' : 'Max Price'}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
    />
  );
}
