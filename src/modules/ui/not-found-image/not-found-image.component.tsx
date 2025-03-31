'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function useImageUrl(): string | null {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    let id = Number(localStorage.getItem('not-found-id'));
    id = !isNaN(id) ? id : 0
    setId(id);
    localStorage.setItem('not-found-id', (id + 1).toString());
  }, []);

  const images = ['stork', 'parrot', 'heron'];
  return id !== null ? `/assets/${images[id % images.length]}.svg` : null;
}

export default function NotFoundImage({ className }: { className?: string}) {
  const imageUrl = useImageUrl();

  return (
    <div className={`${className}`}>
      {imageUrl && <Image src={imageUrl} width={0} height={0} alt="Not Found" />}
    </div>
  )
}
