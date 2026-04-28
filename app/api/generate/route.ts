import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ALL_DESIGNS } from '@/lib/designs';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert social media copywriter specialising in viral meme-style content. 
Your job is to transform input content into punchy, high-impact meme posts.

Rules:
- Headlines must be SHORT, PUNCHY, and IMPACTFUL (max 8 words). Use sentence case.
- Subtext adds context or twist (max 20 words). Keep it sharp.
- CTA is optional — only include if it feels natural (max 6 words)
- Captions are for the post caption (not on the image) — engaging, 2-4 sentences, includes relevant emojis and a call to action. UK English.
- Use the BLAST framework where relevant: Bold opener, Lead with value, Authority/social proof, Specifics, Tell them what to do
- Be provocative but not offensive
- Think like a thought leader who cuts through noise
- Never use cheesy clichés or corporate speak
- No em-dashes. Use short sentences and line breaks.

You must respond with valid JSON only, no markdown, no explanation.`;

// Human-readable labels for prompt context
const TONE_LABELS: Record<string, string> = {
  edgy:     'Edgy & provocative — bold, confrontational, cuts through noise',
  warm:     'Warm & human — relatable, empathetic, personal',
  witty:    'Smart & witty — clever wordplay, dry intelligence',
  straight: 'Straight-talking — direct, no fluff, confident',
};

const HUMOUR_LABELS: Record<string, string> = {
  none:    'No humour — serious and authoritative',
  dry:     'Dry humour — understated wit, deadpan',
  playful: 'Playful — lighthearted, fun energy',
  chaos:   'Full meme chaos — absurdist, internet culture, maximum entertainment',
};

const CONTROVERSY_LABELS: Record<string, string> = {
  safe:     'Safe — universally agreeable, no pushback',
  spicy:    'Mildly spicy — slight edge, might raise an eyebrow',
  'hot-take': 'Hot take — strong opinion that many will disagree with',
  divisive: 'Divisive — intentionally polarising to maximise engagement',
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  'hot-take': 'Hot take — deliver a single strong, punchy opinion that challenges assumptions',
  lesson:     'Lesson — share a key insight or "here\'s what I learned" moment',
  story:      'Story — set up a relatable situation with a twist or reveal',
};

const ACTION_LABELS: Record<string, string> = {
  save:    'Save this post for later',
  comment: 'Comment below with their thoughts',
  click:   'Click the link in bio / caption',
  share:   'Share this with someone who needs to see it',
  follow:  'Follow the account for more',
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram — visual-first, casual tone, hashtags welcome, emoji-heavy',
  linkedin:  'LinkedIn — professional but human, thought-leadership angle, minimal emoji',
  twitter:   'Twitter/X — punchy, thread-starter energy, strong first line, no waffle',
  facebook:  'Facebook — conversational, community feel, slightly longer captions fine',
};

export async function POST(request: NextRequest) {
  try {
    const {
      content,
      profileLink,
      linkLabel,
      audience,
      niche,
      platform = 'instagram',
      tone = 'straight',
      emotion = 'inspiration',
      contentType = 'lesson',
      humour = 'dry',
      controversy = 'safe',
      desiredAction = 'save',
    } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompt = `Transform this content into 3 different meme-style post variations.

─── SOURCE CONTENT ───────────────────────────────────
${content}
${profileLink ? `\nProfile/Website Link: ${profileLink}` : ''}
${linkLabel   ? `Link Label: ${linkLabel}` : ''}

─── AUDIENCE CONTEXT ────────────────────────────────
Target audience:  ${audience  || 'general social media audience'}
Brand / niche:    ${niche     || 'not specified'}
Platform:         ${PLATFORM_LABELS[platform] || platform}

─── MEME STYLE DIRECTIVES ────────────────────────────
Tone / voice:        ${TONE_LABELS[tone]             || tone}
Core emotion to trigger: ${emotion}
Content type:        ${CONTENT_TYPE_LABELS[contentType] || contentType}
Humour level:        ${HUMOUR_LABELS[humour]          || humour}
Controversy dial:    ${CONTROVERSY_LABELS[controversy] || controversy}

─── DESIRED OUTCOME ──────────────────────────────────
After seeing this post, the audience should: ${ACTION_LABELS[desiredAction] || desiredAction}
Bake this into both the image CTA and the caption.

─── OUTPUT FORMAT ────────────────────────────────────
Return a JSON array of exactly 3 objects. Each must have:
{
  "design": one of ${JSON.stringify(ALL_DESIGNS)},
  "headline": "Short punchy headline (max 8 words)",
  "subtext": "Supporting text that adds a twist or context (max 20 words)",
  "cta": "Optional call to action shown on image (max 6 words, or empty string)",
  "caption": "The social media post caption with emojis (2-4 sentences, written for ${platform})"
}

Each design should feel different in style and angle:
- "spotify":  Bold, music/culture energy. Use ALL CAPS for headline. Punchy af.
- "raycast":  Sleek, productivity/tech vibe. Smart and precise. Mix of caps.
- "linear":   Minimal, thoughtful. Lowercase feels fine. Engineer's clarity.

Make each headline completely different from the others. Vary the angle, hook, and emotional tone.
All three must honour the tone, emotion, humour level, and controversy dial specified above.

Return ONLY the JSON array. No other text.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';

    if (!rawText) throw new Error('No content from AI');

    // Parse JSON
    let parsed: unknown;
    try {
      const cleaned = rawText.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      const match = rawText.match(/\[[\s\S]*\]/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Invalid AI response format');
    }

    if (!Array.isArray(parsed) || parsed.length !== 3) {
      throw new Error('Expected 3 meme variations');
    }

    // Validate and sanitise — ensure each gets its assigned design
    const memes = (parsed as Array<Record<string, unknown>>).map((m, i) => ({
      design:   ALL_DESIGNS[i],
      headline: String(m.headline || '').slice(0, 80),
      subtext:  String(m.subtext  || '').slice(0, 120),
      cta:      String(m.cta      || '').slice(0, 60),
      caption:  String(m.caption  || '').slice(0, 600),
    }));

    return NextResponse.json({ memes });
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
