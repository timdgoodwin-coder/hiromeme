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
  // story = very tall (1080×1920 → ratio ~1.78)
  const isStory = canvasHeight / canvasWidth > 1.6;
  // portrait = height clearly taller than width (Instagram 1080×1350) but not story
  const isPortrait = !isStory && canvasHeight / canvasWidth > 1.15;

  const px = (v: number) => `${Math.round(v * s)}px`;

  // Headline sizing — story gets much larger
  const headlineBase = isStory
    ? (headline.length > 50 ? 80 : headline.length > 35 ? 100 : headline.length > 22 ? 118 : 136)
    : (headline.length > 50 ? 58 : headline.length > 35 ? 72 : headline.length > 22 ? 86 : 100);
  const headlinePx = px(headlineBase);

  // Subtext font size
  const subtextBase = isStory ? 48 : isPortrait ? 40 : 34;
  const subtextPx = px(subtextBase);

  // Padding
  const paddingV = isLandscape ? 60 : isStory ? 100 : isPortrait ? 90 : 80;
  const paddingH = isLandscape ? 70 : isStory ? 100 : isPortrait ? 90 : 80;

  // ─── STORY LAYOUT ─────────────────────────────────────────────────────────────
  if (isStory) {
    return (
      <div style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        background: '#060d1f',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        {/* Deep navy base gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(170deg, #060d1f 0%, #0a1628 30%, #071230 60%, #060d1f 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top-right glow */}
        <div style={{
          position: 'absolute', top: px(-200), right: px(-100),
          width: px(800), height: px(800),
          background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(29,78,216,0.10) 45%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom-left glow */}
        <div style={{
          position: 'absolute', bottom: px(-200), left: px(-120),
          width: px(700), height: px(700),
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(30,64,175,0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Mid-canvas secondary glow for depth */}
        <div style={{
          position: 'absolute',
          top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: px(900), height: px(900),
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Dot-grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.10) 1px, transparent 1px)',
          backgroundSize: `${px(40)} ${px(40)}`,
          pointerEvents: 'none',
        }} />

        {/* Top electric-blue accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: px(6),
          background: 'linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Bottom electric-blue accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: px(3),
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Geometric accent — top right */}
        <div style={{
          position: 'absolute', top: px(-60), right: px(-40),
          width: px(420), height: px(420),
          border: '1px solid rgba(59,130,246,0.14)',
          borderRadius: px(50), transform: 'rotate(25deg)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: px(10), right: px(10),
          width: px(260), height: px(260),
          border: '1px solid rgba(96,165,250,0.08)',
          borderRadius: px(36), transform: 'rotate(25deg)',
          pointerEvents: 'none',
        }} />

        {/* ── ZONE 1: Top badge (fixed) ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: `${px(paddingV)} ${px(paddingH)} 0`,
        }}>
          <div style={{
            display: 'flex', width: 'fit-content', alignItems: 'center',
            gap: px(12),
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.40)',
            borderRadius: px(100),
            padding: `${px(12)} ${px(28)}`,
          }}>
            <div style={{
              width: px(11), height: px(11), borderRadius: '50%',
              background: '#3b82f6', boxShadow: `0 0 ${px(10)} #3b82f6`,
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(16), fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#60a5fa',
            }}>Insight</span>
          </div>
        </div>

        {/* ── ZONE 2: Main content — vertically centred in the remaining space ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: `${px(60)} ${px(paddingH)}`,
        }}>
          {/* Headline */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            fontSize: headlinePx,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: px(44),
            margin: `0 0 ${px(44)} 0`,
          }}>
            {headline}
          </h1>

          {/* Blue accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: px(12), marginBottom: px(52) }}>
            <div style={{ width: px(80), height: px(4), background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: px(2) }} />
            <div style={{ width: px(20), height: px(4), background: 'rgba(59,130,246,0.3)', borderRadius: px(2) }} />
            <div style={{ width: px(10), height: px(4), background: 'rgba(59,130,246,0.15)', borderRadius: px(2) }} />
          </div>

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: subtextPx,
              fontWeight: 400,
              lineHeight: 1.55,
              color: '#94a3b8',
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {subtext}
            </p>
          )}
        </div>

        {/* ── ZONE 3: Bottom CTA zone ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: `${px(48)} ${px(paddingH)} ${px(paddingV)}`,
          borderTop: '1px solid rgba(59,130,246,0.12)',
          display: 'flex', flexDirection: 'column', gap: px(28),
        }}>
          {cta && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: px(14),
              background: '#2563eb',
              borderRadius: px(14),
              padding: `${px(22)} ${px(40)}`,
              width: 'fit-content',
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(28), fontWeight: 700,
                color: '#ffffff', letterSpacing: '-0.01em',
              }}>{cta}</span>
              <span style={{ fontSize: px(28), color: '#bfdbfe' }}>→</span>
            </div>
          )}
          {(profileLink || linkLabel) && (
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(26), fontWeight: 600,
              color: '#60a5fa', letterSpacing: '-0.01em',
            }}>
              {linkLabel || profileLink}
            </div>
          )}
        </div>

        {/* Corner dot-grid — bottom right */}
        <div style={{
          position: 'absolute', bottom: px(100), right: px(80),
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          gap: px(9), opacity: 0.18, zIndex: 0, pointerEvents: 'none',
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{ width: px(6), height: px(6), borderRadius: '50%', background: '#3b82f6' }} />
          ))}
        </div>
      </div>
    );
  }

  // ─── SQUARE / PORTRAIT / LANDSCAPE layouts (unchanged) ────────────────────────
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
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, #060d1f 0%, #0a1628 35%, #071230 65%, #060d1f 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Electric blue radial glow — top right ── */}
      <div style={{
        position: 'absolute', top: px(-150), right: px(-80),
        width: px(600), height: px(600),
        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(29,78,216,0.08) 45%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Secondary blue glow — bottom left ── */}
      <div style={{
        position: 'absolute', bottom: px(-120), left: px(-80),
        width: px(500), height: px(500),
        background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(30,64,175,0.06) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Fine dot-grid texture ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)',
        backgroundSize: `${px(36)} ${px(36)}`,
        pointerEvents: 'none',
      }} />

      {/* ── Top electric-blue accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: px(5),
        background: 'linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Diagonal geometric accent lines — decorative ── */}
      <div style={{
        position: 'absolute', top: px(isLandscape ? -40 : -80), right: px(-60),
        width: px(isLandscape ? 280 : 360), height: px(isLandscape ? 280 : 360),
        border: '1px solid rgba(59,130,246,0.12)',
        borderRadius: px(40), transform: 'rotate(30deg)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: px(isLandscape ? 10 : -20), right: px(-20),
        width: px(isLandscape ? 180 : 240), height: px(isLandscape ? 180 : 240),
        border: '1px solid rgba(96,165,250,0.08)',
        borderRadius: px(30), transform: 'rotate(30deg)', pointerEvents: 'none',
      }} />

      {/* ══ SQUARE / PORTRAIT layout ══ */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Badge chip */}
          <div style={{
            display: 'flex', width: 'fit-content', alignItems: 'center',
            gap: px(10),
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.35)',
            borderRadius: px(100), padding: `${px(8)} ${px(20)}`,
            marginBottom: px(isPortrait ? 52 : 44),
          }}>
            <div style={{ width: px(9), height: px(9), borderRadius: '50%', background: '#3b82f6', boxShadow: `0 0 ${px(8)} #3b82f6` }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(13), fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60a5fa' }}>Insight</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            fontSize: headlinePx, fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#ffffff',
            marginBottom: px(isPortrait ? 36 : 28),
            maxWidth: px(isPortrait ? 900 : 880),
          }}>
            {headline}
          </h1>

          {/* Blue accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: px(10), marginBottom: px(isPortrait ? 40 : 32) }}>
            <div style={{ width: px(60), height: px(3), background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: px(2) }} />
            <div style={{ width: px(16), height: px(3), background: 'rgba(59,130,246,0.3)', borderRadius: px(2) }} />
            <div style={{ width: px(8), height: px(3), background: 'rgba(59,130,246,0.15)', borderRadius: px(2) }} />
          </div>

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: subtextPx, fontWeight: 400, lineHeight: 1.55,
              color: '#94a3b8', maxWidth: px(isPortrait ? 900 : 860),
              marginBottom: cta ? px(isPortrait ? 56 : 44) : '0',
              letterSpacing: '-0.01em',
            }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{
              display: 'flex', width: 'fit-content', alignItems: 'center',
              gap: px(12), background: '#2563eb', borderRadius: px(12),
              padding: `${px(16)} ${px(32)}`, marginTop: px(8),
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>{cta}</span>
              <span style={{ fontSize: px(22), color: '#bfdbfe' }}>→</span>
            </div>
          )}
        </div>
      )}

      {/* ══ LANDSCAPE layout ══ */}
      {isLandscape && (
        <>
          {/* Left column: badge + headline */}
          <div style={{ position: 'relative', zIndex: 1, flex: '0 0 auto', width: `${Math.round(canvasWidth * 0.46)}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: px(10), background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', borderRadius: px(100), padding: `${px(6)} ${px(16)}`, marginBottom: px(28) }}>
              <div style={{ width: px(8), height: px(8), borderRadius: '50%', background: '#3b82f6', boxShadow: `0 0 ${px(6)} #3b82f6` }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(12), fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60a5fa' }}>Insight</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", fontSize: headlinePx, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#ffffff', margin: 0 }}>
              {headline}
            </h1>
          </div>

          {/* Vertical blue divider */}
          <div style={{ position: 'relative', zIndex: 1, width: px(1), alignSelf: 'stretch', background: 'linear-gradient(180deg, rgba(6,13,31,0), #3b82f660, #60a5fa60, rgba(6,13,31,0))', flexShrink: 0 }} />

          {/* Right column: subtext + cta + link */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: px(28) }}>
            {subtext && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: px(30), fontWeight: 400, lineHeight: 1.5, color: '#94a3b8', margin: 0, letterSpacing: '-0.01em' }}>
                {subtext}
              </p>
            )}
            {cta && (
              <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: px(10), background: '#2563eb', borderRadius: px(10), padding: `${px(12)} ${px(24)}` }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 700, color: '#ffffff' }}>{cta}</span>
                <span style={{ fontSize: px(18), color: '#bfdbfe' }}>→</span>
              </div>
            )}
            {(profileLink || linkLabel) && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 600, color: '#60a5fa', letterSpacing: '-0.01em' }}>
                {linkLabel || profileLink}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Bottom link bar — square/portrait only ── */}
      {!isLandscape && (profileLink || linkLabel) && (
        <div style={{
          position: 'absolute', bottom: px(paddingV), left: px(paddingH), right: px(paddingH),
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 600, color: '#60a5fa', letterSpacing: '-0.01em' }}>
            {linkLabel || profileLink}
          </div>
        </div>
      )}

      {/* ── Corner hex-grid accent — bottom right ── */}
      <div style={{
        position: 'absolute', bottom: px(isLandscape ? 50 : 70), right: px(isLandscape ? 50 : 70),
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: px(7), opacity: 0.18, zIndex: 0, pointerEvents: 'none',
      }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: px(5), height: px(5), borderRadius: '50%', background: '#3b82f6' }} />
        ))}
      </div>
    </div>
  );
}
