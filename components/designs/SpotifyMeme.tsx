import { MemeData } from '@/lib/designs';

interface Props { data: MemeData; }

export default function SpotifyMeme({ data }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Anton', 'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      boxSizing: 'border-box',
    }}>
      {/* Spotify-style green noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 80% at 50% 110%, #1db95420 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right decorative circle */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-120px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #1db95415 0%, transparent 70%)',
        border: '1px solid #1db95420',
      }} />

      {/* Bottom-left accent */}
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '360px',
        height: '360px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #1db95410 0%, transparent 70%)',
      }} />

      {/* Green accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #1db954, #1ed760, transparent)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#1db95420',
          border: '1px solid #1db95440',
          borderRadius: '100px',
          padding: '6px 16px',
          marginBottom: '48px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#1db954',
          }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#1db954',
          }}>Truth Bomb</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Anton', 'Inter', sans-serif",
          fontSize: headline.length > 40 ? '72px' : headline.length > 25 ? '88px' : '108px',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          {headline}
        </h1>

        {/* Green divider */}
        <div style={{
          width: '80px',
          height: '4px',
          background: '#1db954',
          borderRadius: '2px',
          marginBottom: '32px',
        }} />

        {/* Subtext — bumped up for mobile legibility */}
        {subtext && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '38px',
            fontWeight: 400,
            lineHeight: 1.45,
            color: '#b3b3b3',
            maxWidth: '860px',
            marginBottom: cta ? '48px' : '0',
          }}>
            {subtext}
          </p>
        )}

        {/* CTA */}
        {cta && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: '#1db954',
            borderRadius: '100px',
            padding: '16px 32px',
            marginTop: '16px',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.01em',
            }}>{cta}</span>
            <span style={{ fontSize: '22px', color: '#000' }}>→</span>
          </div>
        )}
      </div>

      {/* Link / Profile at bottom */}
      {(profileLink || linkLabel) && (
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '80px',
          right: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '22px',
            fontWeight: 600,
            color: '#1db954',
          }}>
            {linkLabel || profileLink}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#535353',
            letterSpacing: '0.05em',
          }}>
            ▶ PLAY
          </div>
        </div>
      )}

      {/* Corner dot pattern */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '6px',
        opacity: 0.15,
      }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#1db954',
          }} />
        ))}
      </div>
    </div>
  );
}
