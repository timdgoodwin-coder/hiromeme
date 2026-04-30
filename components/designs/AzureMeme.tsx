import { MemeData } from '@/lib/designs';

interface Props {
  data: MemeData;
  canvasWidth?: number;
  canvasHeight?: number;
}

// "Azure Deep" — midnight navy base, electric-blue accents, geometric precision.
export default function AzureMeme({ data, canvasWidth = 1080, canvasHeight = 1080 }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  // Scale relative to the smaller axis so text always fits
  const s = Math.min(canvasWidth, canvasHeight) / 1080;
  // landscape = width clearly wider than height
  const isLandscape = canvasWidth / canvasHeight > 1.2;
  // portrait = height clearly taller than width (Instagram 1080×1350)
  const isPortrait = canvasHeight / canvasWidth > 1.15;

  const px = (v: number) => `${Math.round(v * s)}px`;

  // Responsive headline sizing
  const headlineBase = headline.length > 50
    ? 58
    : headline.length > 35
      ? 72
      : headline.length > 22
        ? 86
        : 100;
  const headlinePx = px(headlineBase);

  // Subtext font size — slightly larger on portrait to use vertical space
  const subtextBase = isPortrait ? 40 : 34;
  const subtextPx = px(subtextBase);

  // Vertical padding: portrait gets more breathing room
  const paddingV = isLandscape ? 60 : isPortrait ? 90 : 80;
  const paddingH = isLandscape ? 70 : isPortrait ? 90 : 80;

  return (
    <div style={{
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      background: '#060d1f',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: isLandscape ? 'center' : undefined,
      justifyContent: isLandscape ? 'flex-start' : 'center',
      padding: `${px(paddingV)} ${px(paddingH)}`,
      gap: isLandscape ? px(64) : undefined,
      boxSizing: 'border-box',
    }}>
      {/* ── Deep navy base gradient ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(145deg, #060d1f 0%, #0a1628 35%, #071230 65%, #060d1f 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Electric blue radial glow — top right ── */}
      <div style={{
        position: 'absolute',
        top: px(-150),
        right: px(-80),
        width: px(600),
        height: px(600),
        background: 'radial-gradient(circle, #3b82f640 0%, #1d4ed820 35%, transparent 70%)',
        filter: `blur(${px(70)})`,
        pointerEvents: 'none',
      }} />

      {/* ── Secondary blue glow — bottom left ── */}
      <div style={{
        position: 'absolute',
        bottom: px(-120),
        left: px(-80),
        width: px(500),
        height: px(500),
        background: 'radial-gradient(circle, #2563eb30 0%, #1e40af15 40%, transparent 70%)',
        filter: `blur(${px(80)})`,
        pointerEvents: 'none',
      }} />

      {/* ── Fine dot-grid texture ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)',
        backgroundSize: `${px(36)} ${px(36)}`,
        pointerEvents: 'none',
      }} />

      {/* ── Top electric-blue accent bar ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: px(5),
        background: 'linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Diagonal geometric accent lines — decorative ── */}
      <div style={{
        position: 'absolute',
        top: px(isLandscape ? -40 : -80),
        right: px(-60),
        width: px(isLandscape ? 280 : 360),
        height: px(isLandscape ? 280 : 360),
        border: `1px solid rgba(59,130,246,0.12)`,
        borderRadius: px(40),
        transform: 'rotate(30deg)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: px(isLandscape ? 10 : -20),
        right: px(-20),
        width: px(isLandscape ? 180 : 240),
        height: px(isLandscape ? 180 : 240),
        border: `1px solid rgba(96,165,250,0.08)`,
        borderRadius: px(30),
        transform: 'rotate(30deg)',
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════
          SQUARE / PORTRAIT  layout (single column)
      ══════════════════════════════════════════════ */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Badge chip */}
          <div style={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: px(10),
            background: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.35)',
            borderRadius: px(100),
            padding: `${px(8)} ${px(20)}`,
            marginBottom: px(isPortrait ? 52 : 44),
            backdropFilter: 'blur(4px)',
          }}>
            {/* Pulsing dot */}
            <div style={{
              width: px(9),
              height: px(9),
              borderRadius: '50%',
              background: '#3b82f6',
              boxShadow: `0 0 ${px(8)} #3b82f6`,
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(13),
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#60a5fa',
            }}>Insight</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Syne', 'Space Grotesk', 'Inter', sans-serif",
            fontSize: headlinePx,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#f1f5f9',
            marginBottom: px(isPortrait ? 36 : 28),
            maxWidth: px(isPortrait ? 900 : 880),
          }}>
            {headline}
          </h1>

          {/* Blue accent rule */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: px(10),
            marginBottom: px(isPortrait ? 40 : 32),
          }}>
            <div style={{
              width: px(60),
              height: px(3),
              background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
              borderRadius: px(2),
            }} />
            <div style={{
              width: px(16),
              height: px(3),
              background: 'rgba(59,130,246,0.3)',
              borderRadius: px(2),
            }} />
            <div style={{
              width: px(8),
              height: px(3),
              background: 'rgba(59,130,246,0.15)',
              borderRadius: px(2),
            }} />
          </div>

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: subtextPx,
              fontWeight: 400,
              lineHeight: 1.55,
              color: '#94a3b8',
              maxWidth: px(isPortrait ? 900 : 860),
              marginBottom: cta ? px(isPortrait ? 56 : 44) : '0',
              letterSpacing: '-0.01em',
            }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: px(12),
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              boxShadow: `0 ${px(4)} ${px(24)} rgba(59,130,246,0.4)`,
              borderRadius: px(12),
              padding: `${px(16)} ${px(32)}`,
              marginTop: px(8),
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(22),
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>{cta}</span>
              <span style={{ fontSize: px(22), color: '#bfdbfe' }}>→</span>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          LANDSCAPE layout (two columns)
      ══════════════════════════════════════════════ */}
      {isLandscape && (
        <>
          {/* Left column: badge + headline */}
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
              gap: px(10),
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.35)',
              borderRadius: px(100),
              padding: `${px(6)} ${px(16)}`,
              marginBottom: px(28),
              backdropFilter: 'blur(4px)',
            }}>
              <div style={{
                width: px(8),
                height: px(8),
                borderRadius: '50%',
                background: '#3b82f6',
                boxShadow: `0 0 ${px(6)} #3b82f6`,
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(12),
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#60a5fa',
              }}>Insight</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', 'Space Grotesk', 'Inter', sans-serif",
              fontSize: headlinePx,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#f1f5f9',
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>

          {/* Vertical blue divider */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: px(1),
            alignSelf: 'stretch',
            background: 'linear-gradient(180deg, transparent, #3b82f660, #60a5fa60, transparent)',
            flexShrink: 0,
          }} />

          {/* Right column: subtext + cta + link */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: px(28),
          }}>
            {subtext && (
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(30),
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#94a3b8',
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                {subtext}
              </p>
            )}

            {cta && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: px(10),
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                boxShadow: `0 ${px(3)} ${px(18)} rgba(59,130,246,0.4)`,
                borderRadius: px(10),
                padding: `${px(12)} ${px(24)}`,
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: px(18),
                  fontWeight: 700,
                  color: '#ffffff',
                }}>{cta}</span>
                <span style={{ fontSize: px(18), color: '#bfdbfe' }}>→</span>
              </div>
            )}

            {(profileLink || linkLabel) && (
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(18),
                fontWeight: 600,
                color: '#60a5fa',
                letterSpacing: '-0.01em',
              }}>
                {linkLabel || profileLink}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Bottom link bar — square/portrait only ── */}
      {!isLandscape && (profileLink || linkLabel) && (
        <div style={{
          position: 'absolute',
          bottom: px(paddingV),
          left: px(paddingH),
          right: px(paddingH),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: px(22),
            fontWeight: 600,
            color: '#60a5fa',
            letterSpacing: '-0.01em',
          }}>
            {linkLabel || profileLink}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: px(12),
            color: 'rgba(59,130,246,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Azure ◈
          </div>
        </div>
      )}

      {/* ── Corner hex-grid accent — bottom right ── */}
      <div style={{
        position: 'absolute',
        bottom: px(isLandscape ? 50 : 70),
        right: px(isLandscape ? 50 : 70),
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: px(7),
        opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            width: px(5),
            height: px(5),
            borderRadius: '50%',
            background: '#3b82f6',
          }} />
        ))}
      </div>
    </div>
  );
}
