'use client';

import styles from './DesignSelector.module.css';
import { MemeDesign, DesignConfig } from '@/lib/designs';

interface Meme {
  design: MemeDesign;
  headline: string;
  subtext: string;
  caption: string;
  cta?: string;
}

interface Props {
  memes: Meme[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  designs: Record<MemeDesign, DesignConfig>;
}

const DESIGN_ICONS: Record<MemeDesign, string> = {
  spotify: '🎵',
  azure: '🔷',
  linear: '◈',
};

const DESIGN_COLORS: Record<MemeDesign, string> = {
  spotify: '#1db954',
  azure: '#3b82f6',
  linear: '#7c3aed',
};

export default function DesignSelector({ memes, selectedIndex, onSelect, designs }: Props) {
  return (
    <div className={styles.selector}>
      {memes.map((meme, i) => {
        const design = designs[meme.design];
        return (
          <button
            key={i}
            id={`design-tab-${i}`}
            onClick={() => onSelect(i)}
            className={`${styles.tab} ${selectedIndex === i ? styles.tabActive : ''}`}
            style={{
              ['--accent' as string]: DESIGN_COLORS[meme.design],
            }}
          >
            <span className={styles.tabIcon}>{DESIGN_ICONS[meme.design]}</span>
            <span className={styles.tabContent}>
              <span className={styles.tabName}>{design.name}</span>
              <span className={styles.tabTagline}>{design.tagline}</span>
            </span>
            {selectedIndex === i && <span className={styles.tabActive2} />}
          </button>
        );
      })}
    </div>
  );
}
