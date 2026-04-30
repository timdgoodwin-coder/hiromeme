'use client';

import { useEffect, useRef } from 'react';
import { MemeDesign, MemeData } from '@/lib/designs';
import SpotifyMeme from './designs/SpotifyMeme';
import AzureMeme from './designs/AzureMeme';
import LinearMeme from './designs/LinearMeme';

interface MemePreviewProps {
  design: MemeDesign;
  data: MemeData;
  isExport?: boolean;
  exportSize?: { width: number; height: number };
}

export default function MemePreview({ design, data, isExport = false, exportSize }: MemePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scale the rendered design to fit the preview container
  useEffect(() => {
    if (isExport) return;
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const parentWidth = parent.offsetWidth;
      // Always scale from base canvas width for preview
      const scale = parentWidth / (exportSize?.width ?? 1080);
      el.style.transform = `scale(${scale})`;
      el.style.transformOrigin = 'top left';
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    const parent = el.parentElement;
    if (parent) observer.observe(parent);
    return () => observer.disconnect();
  }, [isExport, exportSize?.width]);

  const designComponents = {
    spotify: SpotifyMeme,
    azure: AzureMeme,
    linear: LinearMeme,
  };

  const DesignComponent = designComponents[design];

  // During export use the platform-specific dimensions; otherwise default 1080×1080
  const w = exportSize?.width  ?? 1080;
  const h = exportSize?.height ?? 1080;

  return (
    <div
      ref={containerRef}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <DesignComponent data={data} canvasWidth={w} canvasHeight={h} />
    </div>
  );
}
