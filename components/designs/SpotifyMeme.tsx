import { MemeData } from '@/lib/designs';

interface Props {
  data: MemeData;
  canvasWidth?: number;
  canvasHeight?: number;
}

export default function SpotifyMeme({ data, canvasWidth = 1080, canvasHeight = 1080 }: Props) {
  const { headline, subtext, cta, profileLink, linkLabel } = data;

  // Scale factor based on the smaller dimension so text always fits
  const s = Math.min(canvasWidth, canvasHeight) / 1080;
  // Landscape = width is much larger than height
  const isLandscape = canvasWidth / canvasHeight > 1.2;

  const px = (v: number) => `${Math.round(v * s)}px`;

  // Headline font size — scaled, then further reduced if headline is long
  const headlineBase = headline.length > 40 ? 72 : headline.length > 25 ? 88 : 108;
  const headlinePx = px(headlineBase);

  return (
    <div style={{
      width: `${canvasWidth}px`,
      height: `${canvasHeight}px`,
      background: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Anton', 'Inter', sans-serif",
      display: 'flex',
      flexDirection: isLandscape ? 'row' : 'column',
      alignItems: isLandscape ? 'center' : undefined,
      justifyContent: isLandscape ? 'flex-start' : 'center',
      padding: px(isLandscape ? 60 : 80),
      gap: isLandscape ? px(60) : undefined,
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
        top: px(-120),
        right: px(-120),
        width: px(500),
        height: px(500),
        borderRadius: '50%',
        background: 'radial-gradient(circle, #1db95415 0%, transparent 70%)',
        border: `1px solid #1db95420`,
      }} />

      {/* Bottom-left accent */}
      <div style={{
        position: 'absolute',
        bottom: px(-80),
        left: px(-80),
        width: px(360),
        height: px(360),
        borderRadius: '50%',
        background: 'radial-gradient(circle, #1db95410 0%, transparent 70%)',
      }} />

      {/* Green accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: px(4),
        background: 'linear-gradient(90deg, #1db954, #1ed760, transparent)',
      }} />

      {/* ── SQUARE layout: single column ── */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Label */}
          <div style={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: px(8),
            background: '#1db95420',
            border: '1px solid #1db95440',
            borderRadius: '100px',
            padding: `${px(6)} ${px(16)}`,
            marginBottom: px(48),
          }}>
            <div style={{ width: px(8), height: px(8), borderRadius: '50%', background: '#1db954' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(13),
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1db954',
            }}>Truth Bomb</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Anton', 'Inter', sans-serif",
            fontSize: headlinePx,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: px(32),
            textTransform: 'uppercase',
          }}>
            {headline}
          </h1>

          {/* Green divider */}
          <div style={{ width: px(80), height: px(4), background: '#1db954', borderRadius: px(2), marginBottom: px(32) }} />

          {subtext && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: px(38),
              fontWeight: 400,
              lineHeight: 1.45,
              color: '#b3b3b3',
              maxWidth: px(860),
              marginBottom: cta ? px(48) : '0',
            }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              gap: px(12),
              background: '#1db954',
              borderRadius: '100px',
              padding: `${px(16)} ${px(32)}`,
              marginTop: px(16),
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 700, color: '#000000' }}>{cta}</span>
              <span style={{ fontSize: px(22), color: '#000' }}>→</span>
            </div>
          )}
        </div>
      )}

      {/* ── LANDSCAPE layout: two columns ── */}
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
              background: '#1db95420',
              border: '1px solid #1db95440',
              borderRadius: '100px',
              padding: `${px(5)} ${px(14)}`,
              marginBottom: px(28),
            }}>
              <div style={{ width: px(7), height: px(7), borderRadius: '50%', background: '#1db954' }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(12),
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#1db954',
              }}>Truth Bomb</span>
            </div>

            <h1 style={{
              fontFamily: "'Anton', 'Inter', sans-serif",
              fontSize: headlinePx,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>

          {/* Vertical divider */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '1px',
            alignSelf: 'stretch',
            background: 'linear-gradient(180deg, transparent, #1db95460, transparent)',
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
                fontSize: px(32),
                fontWeight: 400,
                lineHeight: 1.4,
                color: '#b3b3b3',
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
                background: '#1db954',
                borderRadius: '100px',
                padding: `${px(12)} ${px(24)}`,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: px(18), fontWeight: 700, color: '#000000' }}>{cta}</span>
                <span style={{ fontSize: px(18), color: '#000' }}>→</span>
              </div>
            )}

            {(profileLink || linkLabel) && (
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: px(18),
                fontWeight: 600,
                color: '#1db954',
              }}>
                {linkLabel || profileLink}
              </div>
            )}
          </div>
        </>
      )}

      {/* Link / Profile at bottom — square only */}
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
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(22), fontWeight: 600, color: '#1db954' }}>
            {linkLabel || profileLink}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: px(13), color: '#535353', letterSpacing: '0.05em' }}>
            ▶ PLAY
          </div>
        </div>
      )}

      {/* Corner dot pattern */}
      <div style={{
        position: 'absolute',
        bottom: px(80),
        right: px(80),
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: px(6),
        opacity: 0.15,
        zIndex: 0,
      }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{ width: px(4), height: px(4), borderRadius: '50%', background: '#1db954' }} />
        ))}
      </div>
    </div>
  );
}
