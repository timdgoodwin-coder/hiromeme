'use client';

import { useEffect, useRef } from 'react';
import { MemeDesign, MemeData } from '@/lib/designs';
import SpotifyMeme from './designs/SpotifyMeme';
import RaycastMeme from './designs/RaycastMeme';
import LinearMeme from './designs/LinearMeme';

interface MemePreviewProps {
  design: MemeDesign;
  data: MemeData;
  isExport?: boolean;
}

export default function MemePreview({ design, data, isExport = false }: MemePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scale the 1080x1080 design to fit the preview container
  useEffect(() => {
    if (isExport) return;
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const parentWidth = parent.offsetWidth;
      const scale = parentWidth / 1080;
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = 'top left';
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    const parent = el.parentElement;
    if (parent) observer.observe(parent);
    return () => observer.disconnect();
  }, [isExport]);

  const designComponents = {
    spotify: SpotifyMeme,
    raycast: RaycastMeme,
    linear: LinearMeme,
  };

  const DesignComponent = designComponents[design];

  return (
    <div
      ref={containerRef}
      style={{
        width: '1080px',
        height: '1080px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <DesignComponent data={data} />
    </div>
  );
}
