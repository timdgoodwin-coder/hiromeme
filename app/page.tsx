'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './page.module.css';
import MemePreview from '@/components/MemePreview';
import DesignSelector from '@/components/DesignSelector';
import { MemeDesign, MemeData, designs } from '@/lib/designs';

interface GeneratedMeme {
  design: MemeDesign;
  headline: string;
  subtext: string;
  caption: string;
  cta?: string;
}

// ─── Button group helper ───────────────────────────────────────────────────────
function BtnGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className={styles.btnGroup}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`${styles.btnGroupBtn} ${value === opt.value ? styles.btnGroupBtnActive : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Option sets ──────────────────────────────────────────────────────────────
const PLATFORM_OPTIONS = [
  { value: 'instagram', label: '📸 Instagram' },
  { value: 'linkedin',  label: '💼 LinkedIn'  },
  { value: 'twitter',   label: '🐦 Twitter/X' },
  { value: 'facebook',  label: '👥 Facebook'  },
] as const;

const TONE_OPTIONS = [
  { value: 'edgy',         label: '🔥 Edgy'        },
  { value: 'warm',         label: '🤗 Warm'         },
  { value: 'witty',        label: '😏 Witty'        },
  { value: 'straight',     label: '🎯 Straight-talking' },
] as const;

const EMOTION_OPTIONS = [
  { value: 'anger',       label: '😤 Anger'       },
  { value: 'shock',       label: '😱 Shock'       },
  { value: 'hope',        label: '✨ Hope'        },
  { value: 'humour',      label: '😂 Humour'      },
  { value: 'inspiration', label: '💪 Inspiration' },
] as const;

const CONTENT_TYPE_OPTIONS = [
  { value: 'hot-take', label: '🌶 Hot take' },
  { value: 'lesson',   label: '📖 Lesson'   },
  { value: 'story',    label: '🧵 Story'    },
] as const;

const HUMOUR_OPTIONS = [
  { value: 'none',  label: '🪨 None'       },
  { value: 'dry',   label: '😐 Dry'        },
  { value: 'playful', label: '😄 Playful'  },
  { value: 'chaos', label: '🤪 Full chaos' },
] as const;

const CONTROVERSY_OPTIONS = [
  { value: 'safe',     label: '🕊 Safe'          },
  { value: 'spicy',    label: '🌶 Mildly spicy'  },
  { value: 'hot-take', label: '🔥 Hot take'       },
  { value: 'divisive', label: '⚡ Divisive'       },
] as const;

const ACTION_OPTIONS = [
  { value: 'save',    label: '🔖 Save this'        },
  { value: 'comment', label: '💬 Comment below'    },
  { value: 'click',   label: '🔗 Click the link'   },
  { value: 'share',   label: '📤 Share with someone' },
  { value: 'follow',  label: '➕ Follow me'         },
] as const;

type Platform    = typeof PLATFORM_OPTIONS[number]['value'];
type Tone        = typeof TONE_OPTIONS[number]['value'];
type Emotion     = typeof EMOTION_OPTIONS[number]['value'];
type ContentType = typeof CONTENT_TYPE_OPTIONS[number]['value'];
type Humour      = typeof HUMOUR_OPTIONS[number]['value'];
type Controversy = typeof CONTROVERSY_OPTIONS[number]['value'];
type Action      = typeof ACTION_OPTIONS[number]['value'];

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomePage() {
  // Content
  const [content,     setContent]     = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [linkLabel,   setLinkLabel]   = useState('');

  // Audience
  const [audience, setAudience] = useState('');
  const [niche,    setNiche]    = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');

  // Style
  const [tone,        setTone]        = useState<Tone>('straight');
  const [emotion,     setEmotion]     = useState<Emotion>('inspiration');
  const [contentType, setContentType] = useState<ContentType>('lesson');
  const [humour,      setHumour]      = useState<Humour>('dry');
  const [controversy, setControversy] = useState<Controversy>('safe');

  // Action
  const [desiredAction, setDesiredAction] = useState<Action>('save');

  // App state
  const [loading,       setLoading]       = useState(false);
  const [memes,         setMemes]         = useState<GeneratedMeme[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error,         setError]         = useState('');
  const [downloading,   setDownloading]   = useState<number | null>(null);
  const [copiedCaption, setCopiedCaption] = useState<number | null>(null);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const generateMemes = async () => {
    if (!content.trim()) {
      setError('Please enter some content to transform.');
      return;
    }
    setLoading(true);
    setError('');
    setMemes(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          profileLink,
          linkLabel,
          audience,
          niche,
          platform,
          tone,
          emotion,
          contentType,
          humour,
          controversy,
          desiredAction,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Generation failed');
      }

      const data = await res.json();
      setMemes(data.memes);
      setSelectedIndex(0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const downloadPng = useCallback(async (index: number) => {
    const el = previewRefs.current[index];
    if (!el || !memes) return;

    setDownloading(index);
    try {
      const html2canvas = (await import('html2canvas')).default;

      const inner = el.firstElementChild as HTMLElement | null;
      if (!inner) return;

      const prevTransform = inner.style.transform;
      const prevOrigin    = inner.style.transformOrigin;

      inner.style.transform       = 'none';
      inner.style.transformOrigin = 'top left';

      const canvas = await html2canvas(inner, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 1080,
        height: 1080,
        windowWidth: 1080,
        windowHeight: 1080,
        logging: false,
      });

      inner.style.transform       = prevTransform;
      inner.style.transformOrigin = prevOrigin;

      const link     = document.createElement('a');
      link.download  = `meme-${designs[memes[index].design].name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href      = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(null);
    }
  }, [memes]);

  const copyCaption = async (index: number, caption: string) => {
    await navigator.clipboard.writeText(caption);
    setCopiedCaption(index);
    setTimeout(() => setCopiedCaption(null), 2000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>HiroMeme</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.tagline}>Punchy posts, instantly</span>
            <button id="logout-btn" onClick={handleLogout} className={`btn btn-ghost btn-sm ${styles.logoutBtn}`}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* ── Step 1: Input ── */}
        <section className={styles.inputPanel}>
          <div className={styles.sectionHeader}>
            <div className="badge badge-purple">Step 1</div>
            <h2 className={styles.sectionTitle}>Your Content</h2>
            <p className={styles.sectionDesc}>Paste any text — article, thought, opinion, tip — and we&apos;ll transform it into viral meme gold.</p>
          </div>

          {/* Content textarea */}
          <div className={styles.inputGroup}>
            <label htmlFor="content-input">Content to transform</label>
            <textarea
              id="content-input"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your content here… e.g. '95% of businesses fail because they confuse activity with progress. Here's the uncomfortable truth about why your marketing isn't working...'"
              rows={6}
            />
            <div className={styles.charCount}>{content.length} characters</div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="profile-link">Link (optional)</label>
              <input
                id="profile-link"
                type="url"
                value={profileLink}
                onChange={e => setProfileLink(e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="link-label">Link label (optional)</label>
              <input
                id="link-label"
                type="text"
                value={linkLabel}
                onChange={e => setLinkLabel(e.target.value)}
                placeholder="@yourhandle or your website"
                maxLength={40}
              />
            </div>
          </div>

          <div className={styles.formDivider} />

          {/* ── Audience & Platform ── */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>🎯 Audience &amp; Platform</div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="audience-input">Who is this for?</label>
                <input
                  id="audience-input"
                  type="text"
                  value={audience}
                  onChange={e => setAudience(e.target.value)}
                  placeholder="e.g. burnt-out founders, new mums, gym beginners"
                  maxLength={80}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="niche-input">Your niche / brand</label>
                <input
                  id="niche-input"
                  type="text"
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  placeholder="e.g. marketing consultant, wellness coach, SaaS founder"
                  maxLength={80}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Platform</label>
              <BtnGroup options={PLATFORM_OPTIONS} value={platform} onChange={setPlatform} />
            </div>
          </div>

          <div className={styles.formDivider} />

          {/* ── Meme Style ── */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>✨ Meme Style</div>

            <div className={styles.styleGrid}>
              <div className={styles.inputGroup}>
                <label>Tone / Voice</label>
                <BtnGroup options={TONE_OPTIONS} value={tone} onChange={setTone} />
              </div>

              <div className={styles.inputGroup}>
                <label>Core emotion to trigger</label>
                <BtnGroup options={EMOTION_OPTIONS} value={emotion} onChange={setEmotion} />
              </div>

              <div className={styles.inputGroup}>
                <label>Content type</label>
                <BtnGroup options={CONTENT_TYPE_OPTIONS} value={contentType} onChange={setContentType} />
              </div>

              <div className={styles.inputGroup}>
                <label>Humour level</label>
                <BtnGroup options={HUMOUR_OPTIONS} value={humour} onChange={setHumour} />
              </div>

              <div className={styles.inputGroup}>
                <label>Controversy dial</label>
                <BtnGroup options={CONTROVERSY_OPTIONS} value={controversy} onChange={setControversy} />
              </div>
            </div>
          </div>

          <div className={styles.formDivider} />

          {/* ── Desired Action ── */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>📣 What should people do?</div>
            <div className={styles.inputGroup}>
              <label>Desired action</label>
              <BtnGroup options={ACTION_OPTIONS} value={desiredAction} onChange={setDesiredAction} />
            </div>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              ⚠ {error}
            </div>
          )}

          <button
            id="generate-btn"
            onClick={generateMemes}
            disabled={loading || !content.trim()}
            className={`btn btn-primary btn-lg ${styles.generateBtn}`}
          >
            {loading ? (
              <>
                <span className={`animate-spin`}>◌</span>
                Generating your memes…
              </>
            ) : (
              <>✦ Generate 3 Meme Designs</>
            )}
          </button>
        </section>

        {/* Loading skeleton */}
        {loading && (
          <section className={styles.loadingSection}>
            <div className={styles.loadingMessage}>
              <div className={styles.loadingDots}>
                <span></span><span></span><span></span>
              </div>
              <p>Crafting your viral meme posts…</p>
            </div>
            <div className={styles.previewGrid}>
              {[0,1,2].map(i => (
                <div key={i} className={`skeleton ${styles.skeletonCard}`} />
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {memes && !loading && (
          <section className={styles.resultsSection}>
            <div className={styles.sectionHeader}>
              <div className="badge badge-purple">Step 2</div>
              <h2 className={styles.sectionTitle}>Choose Your Design</h2>
              <p className={styles.sectionDesc}>Three different styles, each crafted with a unique design system. Click any to preview, then download as a 1080×1080 PNG.</p>
            </div>

            <DesignSelector
              memes={memes}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              designs={designs}
            />

            <div className={styles.previewGrid}>
              {memes.map((meme, i) => {
                const memeData: MemeData = {
                  headline: meme.headline,
                  subtext: meme.subtext,
                  caption: meme.caption,
                  cta: meme.cta,
                  profileLink: profileLink || undefined,
                  linkLabel: linkLabel || undefined,
                };
                return (
                  <div key={i} className={`${styles.previewCard} ${selectedIndex === i ? styles.previewCardSelected : ''}`}>
                    <div className={styles.previewCardHeader}>
                      <span className={styles.designLabel}>{designs[meme.design].name}</span>
                      <span className={styles.designDesc}>{designs[meme.design].tagline}</span>
                    </div>

                    {/* 1080x1080 canvas preview */}
                    <div className={styles.canvasWrapper}>
                      <div className={styles.canvasInner} ref={el => { previewRefs.current[i] = el; }}>
                        <MemePreview
                          design={meme.design}
                          data={memeData}
                          isExport={false}
                        />
                      </div>
                    </div>

                    <div className={styles.previewActions}>
                      <button
                        id={`download-btn-${i}`}
                        onClick={() => downloadPng(i)}
                        disabled={downloading === i}
                        className={`btn btn-primary ${styles.downloadBtn}`}
                      >
                        {downloading === i ? (
                          <><span className="animate-spin">◌</span> Rendering…</>
                        ) : (
                          <>↓ Download PNG</>
                        )}
                      </button>

                      <button
                        id={`copy-caption-${i}`}
                        onClick={() => copyCaption(i, meme.caption)}
                        className={`btn btn-secondary ${styles.copyBtn}`}
                      >
                        {copiedCaption === i ? '✓ Copied!' : '⎘ Copy caption'}
                      </button>
                    </div>

                    <div className={styles.captionPreview}>
                      <div className={styles.captionLabel}>Post caption</div>
                      <p className={styles.captionText}>{meme.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
