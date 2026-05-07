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
  // Story = very tall (1080×1920, ratio ~1.78)
  const isStory    = canvasHeight / canvasWidth > 1.6;
  const isPortrait = !isStory && canvasHeight / canvasWidth > 1.15;

  const px = (v: number) => `${Math.round(v * s)}px`;

  // Apple-style: headline goes LARGE, tight tracking
  const headlineBase = isStory
    ? (headline.length > 60 ? 76 : headline.length > 40 ? 96 : headline.length > 25 ? 116 : 140)
    : (headline.length > 60 ? 56 : headline.length > 40 ? 72 : headline.length > 25 ? 88 : 108);
  const headlinePx = px(headlineBase);

  const subtextBase = isStory ? 46 : isPortrait ? 36 : 32;
  const subtextPx   = px(subtextBase);

  const paddingV = isLandscape ? 70 : isStory ? 110 : isPortrait ? 110 : 96;
  const paddingH = isLandscape ? 80 : isStory ? 100 : isPortrait ? 96 : 96;

  // Apple palette
  const ink       = '#1d1d1f';
  const midGray   = '#6e6e73';
  const hairline  = '#d2d2d7';
  const appleBlue = '#0071e3';

  // ─── STORY LAYOUT ─────────────────────────────────────────────────────────────
  if (isStory) {
    return (
      <div style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        {/* Subtle off-white tint at top */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 120% 70% at 50% -5%, #f5f5f7 0%, rgba(255,255,255,0) 50%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle blue tint at bottom — draws eye to CTA zone */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '35%',
          background: 'linear-gradient(to top, rgba(0,113,227,0.04) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top hairline */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: px(2), background: appleBlue, pointerEvents: 'none' }} />
        {/* Bottom hairline */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: px(1), background: hairline, pointerEvents: 'none' }} />

        {/* ── ZONE 1: Top eyebrow ── */}
        <div style={{ position: 'relative', zIndex: 1, padding: `${px(paddingV)} ${px(paddingH)} 0` }}>
          <div style={{
            fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
            fontSize: px(18), fontWeight: 600,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            color: appleBlue,
          }}>
            Insight
          </div>
        </div>

        {/* ── ZONE 2: Main content ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: `${px(60)} ${px(paddingH)}`,
        }}>
          {/* Headline */}
          <h1 style={{
            fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
            fontSize: headlinePx, fontWeight: 700, lineHeight: 1.06,
            letterSpacing: '-0.04em', color: ink,
            margin: `0 0 ${px(52)} 0`,
          }}>
            {headline}
          </h1>

          {/* Apple horizontal rule — wider for story */}
          <div style={{ width: px(64), height: px(2), background: hairline, marginBottom: px(52) }} />

          {subtext && (
            <p style={{
              fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
              fontSize: subtextPx, fontWeight: 400, lineHeight: 1.6,
              color: midGray, letterSpacing: '-0.01em', margin: 0,
            }}>
              {subtext}
            </p>
          )}
        </div>

        {/* ── ZONE 3: Bottom CTA zone ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: `${px(52)} ${px(paddingH)} ${px(paddingV)}`,
          borderTop: `1px solid ${hairline}`,
          display: 'flex', flexDirection: 'column', gap: px(28),
        }}>
          {cta && (
            <div style={{
              display: 'flex', width: 'fit-content', alignItems: 'center',
              gap: px(10), background: appleBlue,
              borderRadius: px(980), padding: `${px(22)} ${px(48)}`,
            }}>
              <span style={{
                fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
                fontSize: px(26), fontWeight: 600, lineHeight: 1,
                color: '#ffffff', letterSpacing: '-0.01em',
              }}>{cta}</span>
              <span style={{ fontSize: px(24), lineHeight: 1, color: 'rgba(255,255,255,0.8)' }}>›</span>
            </div>
          )}
          {(profileLink || linkLabel) && (
            <div style={{
              fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif",
              fontSize: px(26), fontWeight: 500, color: appleBlue, letterSpacing: '-0.01em',
            }}>
              {linkLabel || profileLink}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── SQUARE / PORTRAIT / LANDSCAPE layouts (unchanged) ────────────────────────
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
      {/* ── Subtle off-white gradient wash ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 90% at 50% -10%, #f5f5f7 0%, rgba(255,255,255,0) 55%)', pointerEvents: 'none' }} />

      {/* ── Ultra-thin top rule ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: px(1), background: hairline, pointerEvents: 'none' }} />

      {/* ── Thin bottom rule ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: px(1), background: hairline, pointerEvents: 'none' }} />

      {/* ══ SQUARE / PORTRAIT layout ══ */}
      {!isLandscape && (
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Eyebrow label */}
          <div style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(14), fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: appleBlue, marginBottom: px(isPortrait ? 28 : 22) }}>
            Insight
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", fontSize: headlinePx, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.04em', color: ink, marginBottom: px(isPortrait ? 44 : 36), maxWidth: px(isPortrait ? 900 : 880) }}>
            {headline}
          </h1>

          {/* Hairline rule */}
          <div style={{ width: px(48), height: px(1), background: hairline, marginBottom: px(isPortrait ? 44 : 36) }} />

          {subtext && (
            <p style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: subtextPx, fontWeight: 400, lineHeight: 1.6, color: midGray, maxWidth: px(isPortrait ? 880 : 840), marginBottom: cta ? px(isPortrait ? 60 : 48) : '0', letterSpacing: '-0.01em' }}>
              {subtext}
            </p>
          )}

          {cta && (
            <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: px(8), background: appleBlue, borderRadius: px(980), padding: `${px(16)} ${px(36)}`, marginTop: px(8) }}>
              <span style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(20), fontWeight: 600, lineHeight: 1, color: '#ffffff', letterSpacing: '-0.01em' }}>{cta}</span>
              <span style={{ fontSize: px(18), lineHeight: 1, color: 'rgba(255,255,255,0.8)' }}>›</span>
            </div>
          )}
        </div>
      )}

      {/* ══ LANDSCAPE layout ══ */}
      {isLandscape && (
        <>
          {/* Left column: eyebrow + headline */}
          <div style={{ position: 'relative', zIndex: 1, flex: '0 0 auto', width: `${Math.round(canvasWidth * 0.46)}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(12), fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: appleBlue, marginBottom: px(20) }}>
              Insight
            </div>
            <h1 style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", fontSize: headlinePx, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.04em', color: ink, margin: 0 }}>
              {headline}
            </h1>
          </div>

          {/* Vertical hairline divider */}
          <div style={{ position: 'relative', zIndex: 1, width: px(1), alignSelf: 'stretch', background: hairline, flexShrink: 0 }} />

          {/* Right column: subtext + cta */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: px(28) }}>
            {subtext && (
              <p style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(28), fontWeight: 400, lineHeight: 1.55, color: midGray, margin: 0, letterSpacing: '-0.01em' }}>
                {subtext}
              </p>
            )}
            {cta && (
              <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: px(8), background: appleBlue, borderRadius: px(980), padding: `${px(13)} ${px(28)}` }}>
                <span style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(17), fontWeight: 600, lineHeight: 1, color: '#ffffff' }}>{cta}</span>
                <span style={{ fontSize: px(16), lineHeight: 1, color: 'rgba(255,255,255,0.8)' }}>›</span>
              </div>
            )}
            {(profileLink || linkLabel) && (
              <div style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(17), fontWeight: 500, color: appleBlue, letterSpacing: '-0.01em' }}>
                {linkLabel || profileLink}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Bottom link bar — square/portrait only ── */}
      {!isLandscape && (profileLink || linkLabel) && (
        <div style={{ position: 'absolute', bottom: px(paddingV), left: px(paddingH), right: px(paddingH), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif", fontSize: px(20), fontWeight: 500, color: appleBlue, letterSpacing: '-0.01em' }}>
            {linkLabel || profileLink}
          </div>
        </div>
      )}
    </div>
  );
}
