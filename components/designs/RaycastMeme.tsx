import { MemeData } from '@/lib/designs';

interface Props { data: MemeData; }

export default function RaycastMeme({ data }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#1c1c1e',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      boxSizing: 'border-box',
    }}>
      {/* Gradient backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #1c1c1e 0%, #1a0c2e 40%, #0c1a2e 80%, #1c1c1e 100%)',
        pointerEvents: 'none',
      }} />

      {/* Raycast-style glow blob top right */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-50px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, #ff636340 0%, #ff434320 30%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Blue-purple glow bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, #7c3aed30 0%, #3b82f620 40%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Subtle grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Top bar - Raycast window chrome */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '80px',
        right: '80px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
          marginLeft: '16px',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Gradient label */}
        <div style={{
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(255,99,99,0.15), rgba(124,58,237,0.15))',
          border: '1px solid rgba(255,99,99,0.3)',
          borderRadius: '8px',
          padding: '8px 18px',
          marginBottom: '44px',
        }}>
          <span style={{
            fontSize: '20px',
          }}>⚡</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ff6363',
          }}>Hot take</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Syne', 'Space Grotesk', 'Inter', sans-serif",
          fontSize: headline.length > 45 ? '60px' : headline.length > 28 ? '76px' : '92px',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: '28px',
        }}>
          {headline}
        </h1>

        {/* Gradient separator */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, #ff6363, #7c3aed, transparent)',
          marginBottom: '28px',
          opacity: 0.5,
        }} />

        {/* Subtext — bumped up for mobile legibility */}
        {subtext && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '36px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#9ca3af',
            maxWidth: '860px',
            marginBottom: cta ? '44px' : '0',
          }}>
            {subtext}
          </p>
        )}

        {/* CTA pill */}
        {cta && (
          <div style={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: '10px',
            background: '#ff6363',
            borderRadius: '10px',
            padding: '14px 28px',
            marginTop: '8px',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
            }}>{cta}</span>
            <span style={{ fontSize: '22px', color: '#fff' }}>→</span>
          </div>
        )}
      </div>

      {/* Bottom link */}
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
            color: '#ff6363',
          }}>
            {linkLabel || profileLink}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#4b5563',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Raycast ⌘K
          </div>
        </div>
      )}
    </div>
  );
}
