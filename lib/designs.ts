export type MemeDesign = 'spotify' | 'raycast' | 'linear';

export interface DesignConfig {
  name: string;
  tagline: string;
  description: string;
}

export interface MemeData {
  headline: string;
  subtext: string;
  caption: string;
  cta?: string;
  profileLink?: string;
  linkLabel?: string;
}

export const designs: Record<MemeDesign, DesignConfig> = {
  spotify: {
    name: 'Spotify Dark',
    tagline: 'Vibrant green on deep black',
    description: 'Bold, music-inspired. Neon green accent on void-black. Maximum punch.',
  },
  raycast: {
    name: 'Raycast Glow',
    tagline: 'Gradient chrome & electric aura',
    description: 'Premium dark chrome with vibrant gradient accents. Sleek & powerful.',
  },
  linear: {
    name: 'Clean Light',
    tagline: 'White canvas, dark ink & coral pop',
    description: 'Crisp white background with bold dark typography. Stands out in any feed.',
  },
};

export const ALL_DESIGNS: MemeDesign[] = ['spotify', 'raycast', 'linear'];
