import { MemeData } from '@/lib/designs';

interface Props {
  data: MemeData;
  canvasWidth?: number;
  canvasHeight?: number;
}

// "Clean Light" — crisp white canvas, dark ink text, coral/amber accent.
export default function LinearMeme({ data, canvasWidth = 1080, canvasHeight = 1080 }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  const s = Math.min(canvasWidth, canvasHeight) / 1080;
  const isLandscape = canvasWidth / canvasHeight > 1.2;

  const px = (v: number) => `${Math.round(v * s)}px`;

  const headlineBase = headline.length > 50 ? 60 : headline.length > 30 ? 76 : 92;
  const headlinePx = px(headlineBase);

  return (
    <div style={{
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      background: '#fafafa',
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
        height: px(6),
        background: 'linear-gradient(90deg, #ff6b35, #f7c59f, #ff6b35)',
      }} />

      {/* Right side decorative geometry — only for square */}
      {!isLandscape && (
        <>
          <div style={{
            position: 'absolute',
            right: px(-60),
            top: '50%',
            transform: 'translateY(-50%)',
            width: px(320),
            height: px(320),
            borderRadius: '50%',
            border: `1px solid #ff6b3515`,
            opacity: 0.6,
          }} />
          <div style={{
            position: 'absolute',
            right: px(20),
            top: '50%',
            transform: 'translateY(-50%)',
            width: px(200),
            height: px(200),
            borderRadius: '50%',
            border: `1px solid #ff6b3520`,
            opacity: 0.5,
          }} />
        </>
      )}

      {/* Bottom-left large square */}
      <div style={{
        position: 'absolute',
        bottom: px(-120),
        left: px(-60),
        width: px(300),
        height: px(300),
        background: '#ff6b350a',
        borderRadius: px(40),
        transform: 'rotate(20deg)',
      }} />

      {/* Thin horizontal rule near bottom — square only */}
      {!isLandscape && (
        <div style={{
          position: 'absolute',
          bottom: px(110),
          left: px(80),
          right: px(80),
          height: '1px',
          background: '#e5e7eb',
        }} />
      )}

      {/* ── SQUARE layout ── */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Label chip */}
          <div style={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: px(8),
            background: '#ff6b3512',
            border: '1px solid #ff6b3530',
            borderRadius: px(8),
            padding: `${px(8)} ${px(18)}`,
            marginBottom: px(44),
          }}>
            <div style={{ width: px(6), height: px(6), borderRadius: '50%', background: '#ff6b35' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(13),
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ff6b35',
            }}>Perspective</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: headlinePx,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#111827',
            marginBottom: px(36),
            maxWidth: px(880),
          }}>
            {headline}
          </h1>

          {/* Coral accent line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: px(12), marginBottom: px(36) }}>
            <div style={{ width: px(56), height: px(4), background: 'linear-gradient(90deg, #ff6b35, #f7c59f)', borderRadius: px(2) }} />
            <div style={{ width: px(12), height: px(4), background: '#e5e7eb', borderRadius: px(2) }} />
          </div>

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(38),
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#374151',
              maxWidth: px(860),
              marginBottom: cta ? px(48) : '0',
              letterSpacing: '-0.01em',
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
              background: '#ff6b35',
              borderRadius: px(10),
              padding: `${px(16)} ${px(30)}`,
              marginTop: px(8),
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>{cta}</span>
              <span style={{ color: '#fff', fontSize: px(22) }}>→</span>
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
              background: '#ff6b3512',
              border: '1px solid #ff6b3530',
              borderRadius: px(8),
              padding: `${px(6)} ${px(14)}`,
              marginBottom: px(24),
            }}>
              <div style={{ width: px(5), height: px(5), borderRadius: '50%', background: '#ff6b35' }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(12),
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#ff6b35',
              }}>Perspective</span>
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: headlinePx,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#111827',
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>

          {/* Vertical coral divider */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: px(4),
            alignSelf: 'stretch',
            background: 'linear-gradient(180deg, transparent, #ff6b35, transparent)',
            borderRadius: px(2),
            flexShrink: 0,
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
                lineHeight: 1.5,
                color: '#374151',
                margin: 0,
                letterSpacing: '-0.01em',
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
                background: '#ff6b35',
                borderRadius: px(10),
                padding: `${px(12)} ${px(22)}`,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 700, color: '#ffffff' }}>{cta}</span>
                <span style={{ color: '#fff', fontSize: px(18) }}>→</span>
              </div>
            )}

            {(profileLink || linkLabel) && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 600, color: '#ff6b35' }}>
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
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 600, color: '#ff6b35', letterSpacing: '-0.01em' }}>
            {linkLabel || profileLink}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(12), color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Clean Light ◎
          </div>
        </div>
      )}
    </div>
  );
}
