import { MemeData } from '@/lib/designs';

interface Props {
  data: MemeData;
  canvasWidth?: number;
  canvasHeight?: number;
}

export default function RaycastMeme({ data, canvasWidth = 1080, canvasHeight = 1080 }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  const s = Math.min(canvasWidth, canvasHeight) / 1080;
  const isLandscape = canvasWidth / canvasHeight > 1.2;

  const px = (v: number) => `${Math.round(v * s)}px`;

  const headlineBase = headline.length > 45 ? 60 : headline.length > 28 ? 76 : 92;
  const headlinePx = px(headlineBase);

  return (
    <div style={{
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      background: '#1c1c1e',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: isLandscape ? 'center' : undefined,
      justifyContent: isLandscape ? 'flex-start' : 'center',
      padding: px(isLandscape ? 60 : 80),
      gap: isLandscape ? px(60) : undefined,
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
        top: px(-100),
        right: px(-50),
        width: px(500),
        height: px(500),
        background: 'radial-gradient(circle, #ff636340 0%, #ff434320 30%, transparent 70%)',
        filter: `blur(${px(60)})`,
      }} />

      {/* Blue-purple glow bottom left */}
      <div style={{
        position: 'absolute',
        bottom: px(-100),
        left: px(-100),
        width: px(600),
        height: px(600),
        background: 'radial-gradient(circle, #7c3aed30 0%, #3b82f620 40%, transparent 70%)',
        filter: `blur(${px(80)})`,
      }} />

      {/* Subtle grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: `${px(80)} ${px(80)}`,
      }} />

      {/* Top bar - Raycast window chrome */}
      <div style={{
        position: 'absolute',
        top: px(40),
        left: px(80),
        right: px(80),
        display: 'flex',
        alignItems: 'center',
        gap: px(8),
      }}>
        <div style={{ width: px(12), height: px(12), borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: px(12), height: px(12), borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: px(12), height: px(12), borderRadius: '50%', background: '#28c840' }} />
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
          marginLeft: px(16),
        }} />
      </div>

      {/* ── SQUARE layout ── */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Label */}
          <div style={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: px(8),
            background: 'linear-gradient(135deg, rgba(255,99,99,0.15), rgba(124,58,237,0.15))',
            border: '1px solid rgba(255,99,99,0.3)',
            borderRadius: px(8),
            padding: `${px(8)} ${px(18)}`,
            marginBottom: px(44),
          }}>
            <span style={{ fontSize: px(20) }}>⚡</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(14),
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#ff6363',
            }}>Hot take</span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', 'Space Grotesk', 'Inter', sans-serif",
            fontSize: headlinePx,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: px(28),
          }}>
            {headline}
          </h1>

          {/* Gradient separator */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, #ff6363, #7c3aed, transparent)',
            marginBottom: px(28),
            opacity: 0.5,
          }} />

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(36),
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#9ca3af',
              maxWidth: px(860),
              marginBottom: cta ? px(44) : '0',
            }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              gap: px(10),
              background: '#ff6363',
              borderRadius: px(10),
              padding: `${px(14)} ${px(28)}`,
              marginTop: px(8),
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 700, color: '#ffffff' }}>{cta}</span>
              <span style={{ fontSize: px(22), color: '#fff' }}>→</span>
            </div>
          )}
        </div>
      )}

      {/* ── LANDSCAPE layout ── */}
      {isLandscape && (
        <>
          {/* Left column: label + headline */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            flex: '0 0 auto',
            width: `${Math.round(canvasWidth * 0.46)}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              gap: px(8),
              background: 'linear-gradient(135deg, rgba(255,99,99,0.15), rgba(124,58,237,0.15))',
              border: '1px solid rgba(255,99,99,0.3)',
              borderRadius: px(8),
              padding: `${px(6)} ${px(14)}`,
              marginBottom: px(24),
            }}>
              <span style={{ fontSize: px(16) }}>⚡</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(12),
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ff6363',
              }}>Hot take</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', 'Space Grotesk', 'Inter', sans-serif",
              fontSize: headlinePx,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>

          {/* Vertical gradient divider */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '1px',
            alignSelf: 'stretch',
            background: 'linear-gradient(180deg, transparent, #ff636360, #7c3aed60, transparent)',
          }} />

          {/* Right column: subtext + cta */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: px(24),
          }}>
            {subtext && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(30),
                fontWeight: 400,
                lineHeight: 1.45,
                color: '#9ca3af',
                margin: 0,
              }}>
                {subtext}
              </p>
            )}

            {cta && (
              <div style={{
                display: 'flex',
                width: 'fit-content',
                alignItems: 'center',
                gap: px(10),
                background: '#ff6363',
                borderRadius: px(10),
                padding: `${px(12)} ${px(22)}`,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 700, color: '#ffffff' }}>{cta}</span>
                <span style={{ fontSize: px(18), color: '#fff' }}>→</span>
              </div>
            )}

            {(profileLink || linkLabel) && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 600, color: '#ff6363' }}>
                {linkLabel || profileLink}
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom link — square only */}
      {!isLandscape && (profileLink || linkLabel) && (
        <div style={{
          position: 'absolute',
          bottom: px(48),
          left: px(80),
          right: px(80),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 600, color: '#ff6363' }}>
            {linkLabel || profileLink}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(12), color: '#4b5563', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Raycast ⌘K
          </div>
        </div>
      )}
    </div>
  );
}
