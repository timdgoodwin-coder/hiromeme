import { MemeData } from '@/lib/designs';

interface Props { data: MemeData; }

// "Clean Light" — crisp white canvas, dark ink text, coral/amber accent.
// Designed to stand out in a feed full of dark posts.
export default function LinearMeme({ data }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  return (
    <div style={{
      width: '1080px',
      height: '1080px',
      background: '#fafafa',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      boxSizing: 'border-box',
    }}>
      {/* Warm paper texture tint */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 140% 80% at 80% 120%, #fff3e010 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Top accent bar — bold coral */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #ff6b35, #f7c59f, #ff6b35)',
      }} />

      {/* Right side decorative geometry */}
      <div style={{
        position: 'absolute',
        right: '-60px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        border: '1px solid #ff6b3515',
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '1px solid #ff6b3520',
        opacity: 0.5,
      }} />

      {/* Bottom-left large square — subtle structure */}
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        left: '-60px',
        width: '300px',
        height: '300px',
        background: '#ff6b350a',
        borderRadius: '40px',
        transform: 'rotate(20deg)',
      }} />

      {/* Thin horizontal rule near bottom */}
      <div style={{
        position: 'absolute',
        bottom: '110px',
        left: '80px',
        right: '80px',
        height: '1px',
        background: '#e5e7eb',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label chip */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ff6b3512',
          border: '1px solid #ff6b3530',
          borderRadius: '8px',
          padding: '8px 18px',
          marginBottom: '44px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#ff6b35',
          }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ff6b35',
          }}>Perspective</span>
        </div>

        {/* Headline — dark ink, bold */}
        <h1 style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: headline.length > 50 ? '60px' : headline.length > 30 ? '76px' : '92px',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#111827',
          marginBottom: '36px',
          maxWidth: '880px',
        }}>
          {headline}
        </h1>

        {/* Coral accent line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '36px',
        }}>
          <div style={{
            width: '56px',
            height: '4px',
            background: 'linear-gradient(90deg, #ff6b35, #f7c59f)',
            borderRadius: '2px',
          }} />
          <div style={{
            width: '12px',
            height: '4px',
            background: '#e5e7eb',
            borderRadius: '2px',
          }} />
        </div>

        {/* Subtext — dark grey, large for mobile */}
        {subtext && (
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '38px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#374151',
            maxWidth: '860px',
            marginBottom: cta ? '48px' : '0',
            letterSpacing: '-0.01em',
          }}>
            {subtext}
          </p>
        )}

        {/* CTA */}
        {cta && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ff6b35',
            borderRadius: '10px',
            padding: '16px 30px',
            marginTop: '8px',
            boxShadow: '0 4px 24px rgba(255,107,53,0.25)',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}>{cta}</span>
            <span style={{ color: '#fff', fontSize: '22px', opacity: 0.85 }}>→</span>
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
            color: '#ff6b35',
            letterSpacing: '-0.01em',
          }}>
            {linkLabel || profileLink}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: '#9ca3af',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Clean Light ◎
          </div>
        </div>
      )}
    </div>
  );
}
