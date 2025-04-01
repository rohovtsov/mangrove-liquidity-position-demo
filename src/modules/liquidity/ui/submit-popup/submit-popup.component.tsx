'use client';
import style from './style.module.scss';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  submitData: object | null;
  clearSubmit: () => void;
}

export default function SubmitPopup({ submitData, clearSubmit }: Props) {
  const [lastSerializedData, setLastData] = useState<string | null>(null);
  const serializedData = useMemo(() => {
    if (!submitData) {
      return null;
    }

    return JSON.stringify(submitData, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2);
  }, [submitData]);

  useEffect(() => {
    if (!serializedData) {
      return;
    }

    setLastData(serializedData);
  }, [serializedData])

  return (
    <div className={`${style['submit-popup']} ${submitData ? style['open'] : ''}`}>
      <div className={style['submit-popup-inner']}>
        <h2>Position Data</h2>
        <div className={style['submit-popup-data']}>
          { serializedData ?? lastSerializedData }
        </div>
      </div>
      <div className={style['submit-popup-bg']} onClick={() => clearSubmit()}></div>
    </div>
  );
}
