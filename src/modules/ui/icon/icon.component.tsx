'use client';
import React, { useEffect, useState } from 'react';
import style from './style.module.scss';

interface Props {
  name: string;
  className?: string;
  alt?: string;
}

function useFetchSvg(url: string) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'same-origin',
          cache: 'force-cache',
          headers: { 'Cache-Control': 'max-age=3600, must-revalidate' }
        });

        if (!response.ok) {
          throw new Error(`Error loading SVG: ${response.status}`);
        }

        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (err) {
        console.error(err);
        setError(true);
        setSvgContent(null);
      }
    };

    if (url) {
      fetchSvg();
    }
  }, [url]);

  return { svgContent, error };
}

export default function Icon({ name, className, alt }: Props) {
  const url = `/assets/icons/${name}.svg`;
  const { svgContent } = useFetchSvg(url);

  return (
    <ins
      className={`${style['icon']} ${className}`}
      dangerouslySetInnerHTML={svgContent ? {__html: svgContent} : undefined}
      aria-label={alt}
      role={'img'}
    />
  );
};
