import { MemeData } from '@/lib/designs';

interface Props {
  data: MemeData;
  canvasWidth?: number;
  canvasHeight?: number;
}

// "Apple Inspired" — pure white canvas, SF Pro stack, near-black ink, Apple blue accent.
// Principles: radical whitespace, cinematic restraint, zero decoration, typography-first.
export default function LinearMeme({ data, canvasWidth = 1080, canvasHeight = 1080 }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  const s = Math.min(canvasWidth, canvasHeight) / 1080;
  const isLandscape = canvasWidth / canvasHeight > 1.2;
  const isPortrait  = canvasHeight / canvasWidth > 1.15;

  const px = (v: number) => `${Math.round(v * s)}px`;

  // Apple-style: headline goes LARGE, tight tracking
  const headlineBase = headline.length > 60
    ? 56
    : headline.length > 40
      ? 72
      : headline.length > 25
        ? 88
        : 108;
  const headlinePx = px(headlineBase);

  const subtextBase = isPortrait ? 36 : 32;
  const subtextPx   = px(subtextBase);

  const paddingV = isLandscape ? 70 : isPortrait ? 110 : 96;
  const paddingH = isLandscape ? 80 : isPortrait ? 96 : 96;

  // Apple palette
  const ink      = '#1d1d1f';   // near-black
  const midGray  = '#6e6e73';   // Apple secondary text
  const hairline = '#d2d2d7';   // Apple rule / border
  const appleBlue = '#0071e3';  // Apple CTA blue

  return (
    <div style={{
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: isLandscape ? 'center' : undefined,
      justifyContent: isLandscape ? 'flex-start' : 'center',
      padding: `${px(paddingV)} ${px(paddingH)}`,
      gap: isLandscape ? px(72) : undefined,
      boxSizing: 'border-box',
    }}>

      {/* ── Subtle off-white gradient wash — Apple's signature light tint ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 90% at 50% -10%, #f5f5f7 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* ── Ultra-thin top rule — Apple‑style hairline ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: px(1),
        background: hairline,
        pointerEvents: 'none',
      }} />

      {/* ── Thin bottom rule ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: px(1),
        background: hairline,
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════
          SQUARE / PORTRAIT layout
      ══════════════════════════════════════════════ */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>

          {/* Eyebrow label — Apple "category" tag */}
          <div style={{
            fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
            fontSize: px(14),
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: appleBlue,
            marginBottom: px(isPortrait ? 28 : 22),
          }}>
            Insight
          </div>

          {/* Headline — SF Pro Display style: massive, tight */}
          <h1 style={{
            fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            fontSize: headlinePx,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            color: ink,
            marginBottom: px(isPortrait ? 44 : 36),
            maxWidth: px(isPortrait ? 900 : 880),
          }}>
            {headline}
          </h1>

          {/* Apple‑style horizontal hairline rule */}
          <div style={{
            width: px(48),
            height: px(1),
            background: hairline,
            marginBottom: px(isPortrait ? 44 : 36),
          }} />

          {subtext && (
            <p style={{
              fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
              fontSize: subtextPx,
              fontWeight: 400,
              lineHeight: 1.6,
              color: midGray,
              maxWidth: px(isPortrait ? 880 : 840),
              marginBottom: cta ? px(isPortrait ? 60 : 48) : '0',
              letterSpacing: '-0.01em',
            }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: px(8),
              background: appleBlue,
              borderRadius: px(980),   // Apple pill button
              padding: `${px(16)} ${px(36)}`,
              marginTop: px(8),
            }}>
              <span style={{
                fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
                fontSize: px(20),
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>{cta}</span>
              <span style={{ fontSize: px(18), color: 'rgba(255,255,255,0.8)' }}>›</span>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          LANDSCAPE layout (two-column)
      ══════════════════════════════════════════════ */}
      {isLandscape && (
        <>
          {/* Left column: eyebrow + headline */}
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
              fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
              fontSize: px(12),
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: appleBlue,
              marginBottom: px(20),
            }}>
              Insight
            </div>
            <h1 style={{
              fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
              fontSize: headlinePx,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: ink,
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>

          {/* Vertical hairline divider */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: px(1),
            alignSelf: 'stretch',
            background: hairline,
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
            gap: px(28),
          }}>
            {subtext && (
              <p style={{
                fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
                fontSize: px(28),
                fontWeight: 400,
                lineHeight: 1.55,
                color: midGray,
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
                gap: px(8),
                background: appleBlue,
                borderRadius: px(980),
                padding: `${px(13)} ${px(28)}`,
                width: 'fit-content',
              }}>
                <span style={{
                  fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
                  fontSize: px(17),
                  fontWeight: 600,
                  color: '#ffffff',
                }}>{cta}</span>
                <span style={{ fontSize: px(16), color: 'rgba(255,255,255,0.8)' }}>›</span>
              </div>
            )}

            {(profileLink || linkLabel) && (
              <div style={{
                fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
                fontSize: px(17),
                fontWeight: 500,
                color: appleBlue,
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
            fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
            fontSize: px(20),
            fontWeight: 500,
            color: appleBlue,
            letterSpacing: '-0.01em',
          }}>
            {linkLabel || profileLink}
          </div>
          <div style={{
            fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
            fontSize: px(11),
            color: hairline,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Apple Inspired ◦
          </div>
        </div>
      )}
    </div>
  );
}
