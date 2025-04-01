'use client';
import style from './style.module.scss';
import { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function NumberInput({value, label, onChange}: Props) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <label className={style['number-input']}>
      <div className={style['number-input-inner']}>
        <span className={style['number-input-label']}>{label}</span>
        <input
          type="number"
          value={value === 0 ? '' : value}
          placeholder={'0'}
          onChange={handleInputChange}
        />
      </div>
    </label>
  );
}
