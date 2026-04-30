export type MemeDesign = 'spotify' | 'azure' | 'linear';

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
  azure: {
    name: 'Azure Deep',
    tagline: 'Electric blue on midnight navy',
    description: 'Rich navy depths with electric blue accents. Premium, authoritative & striking.',
  },
  linear: {
    name: 'Clean Light',
    tagline: 'White canvas, dark ink & coral pop',
    description: 'Crisp white background with bold dark typography. Stands out in any feed.',
  },
};

export const ALL_DESIGNS: MemeDesign[] = ['spotify', 'azure', 'linear'];
