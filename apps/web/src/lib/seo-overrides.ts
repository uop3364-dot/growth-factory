/**
 * SEO v2: Page-specific overrides for top 20 high-potential pages.
 *
 * Each override contains:
 * - title variants (A = recommended, B = test candidate)
 * - description variants
 * - custom CTA headline + subtext
 * - affiliate context (which partner to recommend)
 * - intent-matched H2 / intro adjustments
 * - custom examples for the page's specific intent
 *
 * Selection criteria (without GSC data):
 * 1. Main tool pages — broadest keywords, highest potential impressions
 * 2. Platform hub pages — platform-specific search intent
 * 3. High-value keyword topic pages — commercial intent + volume
 */

export interface SeoOverride {
  /** Recommended title (variant A) */
  titleA: string;
  /** Test title (variant B) — swap in after 7 days if A underperforms */
  titleB: string;
  /** Recommended meta description */
  descA: string;
  /** Test meta description */
  descB: string;
  /** Custom hero CTA headline (replaces default "Generate Now") */
  ctaHeadline?: string;
  /** Custom hero CTA subtext */
  ctaSubtext?: string;
  /** Preferred affiliate partner slug for this page */
  affiliateSlug?: string;
  /** Custom affiliate CTA headline */
  affiliateHeadline?: string;
  /** Custom affiliate CTA subtext */
  affiliateSubtext?: string;
  /** Custom H2 for content section (overrides template) */
  contentH2?: string;
  /** Custom intro paragraph */
  contentIntro?: string;
  /** Page-specific examples */
  examples?: string[];
  /** Diagnosis notes (not rendered, for audit log) */
  diagnosis: string;
  /** Expected uplift hypothesis */
  hypothesis: string;
}

// Use variant A by default. Set to 'B' to activate test variants.
export const ACTIVE_VARIANT: 'A' | 'B' = 'A';

export const SEO_OVERRIDES: Record<string, SeoOverride> = {

  // ═══════════════════════════════════════════════════════════════════
  // TIER 1: Main Tool Pages (highest impression potential)
  // ═══════════════════════════════════════════════════════════════════

  '/': {
    titleA: 'Free AI Tools for Creators — Captions, Bios, Titles & Hashtags',
    titleB: 'AI Caption Generator & Creator Tools — 100% Free, No Signup',
    descA: 'Generate captions, bios, titles, and hashtags with AI. 100% free, no login, instant results. Used by 50K+ creators. Try now.',
    descB: 'Free AI-powered caption generator for Instagram, TikTok, YouTube & more. Plus bio, title, and hashtag tools. No signup needed — try in 5 seconds.',
    ctaHeadline: 'Generate Captions Now',
    ctaSubtext: 'Join 50K+ creators using free AI tools',
    diagnosis: 'Homepage competes for broad "ai tools for creators" queries. Current title is good but could test product-led variant. Missing social proof in description.',
    hypothesis: 'Adding "50K+ creators" social proof in desc should lift CTR 10-15%. Product-led title B may capture more transactional queries.',
  },

  '/caption-generator': {
    titleA: 'Free AI Caption Generator — Instagram, TikTok, YouTube (Instant)',
    titleB: 'AI Caption Generator — Free Captions for Instagram, TikTok & YouTube',
    descA: 'Generate scroll-stopping captions with AI in 5 seconds. Includes hashtags, CTAs, and short variants. Free, no signup. Works for Instagram, TikTok, YouTube, X & Facebook.',
    descB: 'Need better captions? Our AI generates platform-optimized captions with hashtags and CTAs. 100% free, no login. Instagram, TikTok, YouTube, X, Facebook.',
    ctaHeadline: 'Generate Your Caption Now',
    ctaSubtext: 'Free forever — no login, no limits',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Schedule Your Captions Automatically',
    affiliateSubtext: 'Generated your captions? Schedule them across all platforms with Metricool — free plan available.',
    diagnosis: 'Primary money page. "caption generator" has ~14K monthly searches. Current title good but "Instagram" should come before "No Login" for keyword match.',
    hypothesis: 'Moving platform names to title front should improve keyword match CTR +8-12%. Affiliate CTA tied to scheduling intent should lift affiliate clicks.',
  },

  '/bio-generator': {
    titleA: 'Free AI Bio Generator — Instagram, TikTok, LinkedIn Bio in Seconds',
    titleB: 'AI Bio Generator for Instagram & TikTok — Free, Instant, No Signup',
    descA: 'Generate the perfect social media bio with AI. Optimized for Instagram (150 chars), TikTok (80 chars), LinkedIn (300 chars). 17 bio options per generation. Free, instant.',
    descB: 'Stop staring at a blank bio. Our AI creates 17 bio options for your platform in seconds — professional, creative, witty & more. Free, no signup needed.',
    ctaHeadline: 'Generate Your Bio Now',
    ctaSubtext: '17 bio options in one click — free',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Make Your Profile Stand Out',
    affiliateSubtext: 'Great bio + great visuals = more followers. Design profile pics and covers with Canva — free plan.',
    contentH2: 'How to Write the Perfect Social Media Bio',
    examples: [
      '"Helping 10K+ creators grow on YouTube | Free tips daily | Link below" — credibility + CTA',
      '"Coffee-fueled designer in Tokyo | Available for freelance | DM me" — personality + offer',
      '"Travel | Food | Photography | DM for collabs" — minimalist keyword bio',
    ],
    diagnosis: '"bio generator" ~8K monthly searches. Current desc is generic. Specificity about char limits and 17 options is a differentiator vs competitors.',
    hypothesis: 'Specific numbers (17 bio options, char limits) create curiosity and competence signal. Should lift CTR +10% and reduce bounce rate.',
  },

  '/title-generator': {
    titleA: 'Free AI Title Generator — YouTube Titles, Blog Headlines (Instant)',
    titleB: 'YouTube Title Generator — AI-Powered Click-Worthy Titles (Free)',
    descA: 'Generate click-worthy titles for YouTube videos, blog posts & newsletters with AI. 10+ titles with SEO optimization and power words. Free, no signup.',
    descB: 'Struggling with YouTube titles? Our AI generates 10+ click-optimized title ideas with character counts and power words. Free, instant, no login.',
    ctaHeadline: 'Generate Titles Now',
    ctaSubtext: '10+ title ideas in one click',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Get More Views with Better SEO',
    affiliateSubtext: 'Great title + great SEO = more views. vidIQ shows you exactly what keywords to target — start free.',
    contentH2: 'How to Write Click-Worthy YouTube Titles',
    examples: [
      '"I Tried AI for 30 Days — Here\'s What Happened" — curiosity gap + timeframe',
      '"7 YouTube Mistakes Killing Your Views (Fix #3 Today)" — listicle + urgency',
      '"The ONLY Editing App You Need in 2026" — authority + specificity',
    ],
    diagnosis: '"youtube title generator" ~6K monthly. Current title leads with generic "AI Title Generator". YouTube-specific variant B may capture more specific intent.',
    hypothesis: 'YouTube-first title B should capture high-intent "youtube title generator" queries. vidIQ affiliate pairing has natural intent match.',
  },

  '/hashtag-generator': {
    titleA: 'Free AI Hashtag Generator — Instagram, TikTok (30+ Hashtags)',
    titleB: 'Instagram Hashtag Generator — 30+ Free AI Hashtags (Instant)',
    descA: 'Generate 30+ trending hashtags for Instagram, TikTok, YouTube & X with AI. Niche-specific, copy-ready sets. Includes trending + low-competition mix. Free, instant.',
    descB: 'Stop guessing which hashtags to use. Our AI generates 30+ platform-optimized hashtags with trending + niche mix. Copy-ready sets. Free, no signup.',
    ctaHeadline: 'Generate Hashtags Now',
    ctaSubtext: '30+ hashtags in one click — free',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Track Which Hashtags Actually Work',
    affiliateSubtext: 'Generated your hashtags? Track which ones drive reach with Metricool analytics — free plan available.',
    examples: [
      '#ContentCreator #GrowOnInstagram #ReelsStrategy — niche creator mix',
      '#FYP #ForYou #TikTokTips + 2 niche tags — TikTok discovery formula',
      '#YouTubeSEO #SmallYouTuber + topic tag — YouTube growth mix',
    ],
    diagnosis: '"hashtag generator" ~22K monthly — highest volume keyword. Instagram-first variant B may capture the larger "instagram hashtag generator" ~12K query.',
    hypothesis: 'Instagram-first title B targets the highest-volume specific query. "Stop guessing" pain-point opening in desc B should lift CTR +12%.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // TIER 2: Platform Hub Pages
  // ═══════════════════════════════════════════════════════════════════

  '/caption-generator/youtube': {
    titleA: 'Free YouTube Caption Generator — AI-Powered Descriptions & Titles',
    titleB: 'YouTube Description Generator — Free AI Tool (Instant Results)',
    descA: 'Generate optimized YouTube descriptions, titles, and captions with AI. Includes hashtags, timestamps format, and CTAs. Free, instant, built for YouTubers.',
    descB: 'Write better YouTube descriptions in seconds. AI generates SEO-optimized descriptions with keywords, CTAs, and the perfect length. Free, no signup.',
    ctaHeadline: 'Generate YouTube Captions Now',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Rank Higher on YouTube',
    affiliateSubtext: 'Pair your captions with vidIQ\'s keyword data to rank for the right searches — start free.',
    contentH2: 'How to Write YouTube Descriptions That Rank',
    contentIntro: 'YouTube descriptions are SEO goldmines — the first 160 characters show in search results, and well-optimized descriptions help your videos rank for target keywords.',
    examples: [
      'Hook: "In this video, I reveal the 3 editing tricks that doubled my views..."',
      'CTA: "Subscribe and hit the bell for weekly YouTube tips!"',
      'Timestamps: "0:00 Intro | 1:30 Setup | 4:15 Main technique | 8:00 Results"',
    ],
    diagnosis: '"youtube caption generator" and "youtube description generator" combined ~5K monthly. Current page uses generic caption framing. "Description" angle may better match YouTube-specific intent.',
    hypothesis: 'YouTube users search for "description generator" more than "caption generator". Testing description-led framing should capture more intent-matched traffic.',
  },

  '/caption-generator/instagram': {
    titleA: 'Free Instagram Caption Generator — AI Captions with Hashtags (2026)',
    titleB: 'Instagram Caption Generator — Free AI Tool with Hashtags & CTAs',
    descA: 'Generate Instagram captions that get likes, comments, and saves. AI creates captions with hashtags, CTAs, and the perfect hook. Free, instant, works for Reels too.',
    descB: 'Need Instagram captions? Our AI generates scroll-stopping captions with hashtags optimized for the algorithm. Feed posts, Reels, Stories. Free, no login.',
    ctaHeadline: 'Generate Instagram Captions Now',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Schedule & Analyze Your Instagram Posts',
    affiliateSubtext: 'Post your captions at the best time with Metricool — free scheduling for Instagram, TikTok & more.',
    contentH2: 'How to Write Instagram Captions That Get Engagement',
    examples: [
      '"The first line is everything — it\'s the only text visible before \'more\'" — hook principle',
      '"Save this for later" — drives saves, which the algorithm loves',
      '"Double tap if you agree" — simple engagement booster',
    ],
    diagnosis: '"instagram caption generator" ~18K monthly — 2nd highest volume. Adding "(2026)" in title A signals freshness for Google. Reels mention captures growing search intent.',
    hypothesis: 'Year tag signals freshness to both Google and users. Mentioning Reels captures growing search subset. Expected CTR lift +8-10%.',
  },

  '/caption-generator/tiktok': {
    titleA: 'Free TikTok Caption Generator — AI Captions That Go Viral (2026)',
    titleB: 'TikTok Caption Generator — Free AI Tool for Viral Captions',
    descA: 'Generate TikTok captions that stop the scroll. AI-powered with trending hooks, hashtags, and CTAs optimized for TikTok\'s algorithm. Free, instant, no signup.',
    descB: 'Write TikTok captions that get views. Our AI creates short, punchy captions with trending hashtags and hooks. Optimized for mobile. Free, no login.',
    ctaHeadline: 'Generate TikTok Captions Now',
    affiliateSlug: 'opusclip',
    affiliateHeadline: 'Turn Long Videos into TikTok Clips',
    affiliateSubtext: 'Got long-form content? OpusClip turns it into viral TikTok clips automatically — try free.',
    contentH2: 'How to Write TikTok Captions That Get Views',
    examples: [
      '"Wait for the end…" — curiosity gap that boosts watch time',
      '"Follow for Part 2" — drives follows + signals series content',
      '"POV: you finally found the hack that works" — trending format',
    ],
    diagnosis: '"tiktok caption generator" ~9K monthly. "Viral" is the key power word for TikTok audience. OpusClip affiliate has perfect intent match for TikTok creators.',
    hypothesis: '"Viral" power word + TikTok-specific language should resonate with younger audience. OpusClip pairing should outperform Metricool for this audience.',
  },

  '/caption-generator/x': {
    titleA: 'Free X (Twitter) Caption Generator — AI Tweets & Thread Starters',
    titleB: 'Twitter/X Post Generator — Free AI Tool for Tweets & Threads',
    descA: 'Generate punchy tweets, thread starters, and X posts with AI. Optimized for engagement with hooks, polls, and the 280-char sweet spot. Free, instant.',
    descB: 'Write better tweets in seconds. AI generates X/Twitter posts with proven hook formulas, thread openers, and engagement triggers. Free, no signup.',
    ctaHeadline: 'Generate X Posts Now',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Schedule Your Tweets for Maximum Reach',
    affiliateSubtext: 'Post at the perfect time with Metricool — schedule X/Twitter, Instagram & more. Free plan available.',
    examples: [
      '"Hot take: [contrarian statement]" — drives quote tweets',
      '"Thread: 10 things I learned from [experience]" — thread hook',
      '"Unpopular opinion: [strong position]" — engagement bait',
    ],
    diagnosis: '"twitter caption generator" + "x post generator" combined ~3K monthly. Dual naming (X/Twitter) captures both search patterns. Thread mentions capture growing intent.',
    hypothesis: 'Including both "X" and "Twitter" captures users searching with either name. Thread mentions differentiate from basic tweet generators.',
  },

  '/caption-generator/facebook': {
    titleA: 'Free Facebook Caption Generator — AI Posts for Pages & Groups',
    titleB: 'Facebook Post Generator — Free AI Captions for Pages & Groups',
    descA: 'Generate engaging Facebook posts for pages, groups, and personal profiles with AI. Includes shareable hooks, CTAs, and the ideal post length. Free, instant.',
    descB: 'Write Facebook posts that get shares and comments. AI creates community-driving captions for pages, groups, and events. Free, no signup.',
    ctaHeadline: 'Generate Facebook Posts Now',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Create Scroll-Stopping Facebook Graphics',
    affiliateSubtext: 'Great post + great visual = more reach. Design Facebook graphics with Canva — free plan.',
    examples: [
      '"Share if you agree" — leverages Facebook\'s share-driven algorithm',
      '"Tag someone who needs to see this" — expands organic reach',
      '"What do you think? Drop your answer below" — drives comments',
    ],
    diagnosis: '"facebook caption generator" ~4K monthly. "Pages & Groups" captures B2B and community manager intent which competitors miss.',
    hypothesis: 'Adding "Pages & Groups" targets overlooked B2B/community manager segment. Canva pairing matches Facebook\'s visual-heavy format.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // TIER 3: High-Value Topic Pages (10)
  // ═══════════════════════════════════════════════════════════════════

  '/caption-generator/youtube/marketing': {
    titleA: 'YouTube Marketing Captions — Free AI Generator with CTAs',
    titleB: 'Free YouTube Marketing Caption Generator — AI-Powered CTAs & Hooks',
    descA: 'Generate marketing-focused YouTube descriptions and captions with AI. Includes CTAs, keyword optimization, and conversion-driven hooks. Free, instant.',
    descB: 'Write YouTube marketing captions that convert. AI generates descriptions with CTAs, SEO keywords, and engagement hooks. Free, no signup.',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Find Marketing Keywords That Rank',
    affiliateSubtext: 'vidIQ shows which marketing keywords your competitors rank for — target the gaps. Start free.',
    diagnosis: '"youtube marketing captions" commercial intent. Marketers searching this are likely managing brand channels — high affiliate conversion potential.',
    hypothesis: 'Marketing-specific CTA language and vidIQ pairing should drive highest affiliate click rate among topic pages. Expected 3-5% affiliate CTR.',
  },

  '/caption-generator/youtube/business': {
    titleA: 'YouTube Business Captions — Free AI Generator for Brand Channels',
    titleB: 'Free Business YouTube Caption Generator — Professional AI Descriptions',
    descA: 'Generate professional YouTube captions for business channels. AI creates brand-appropriate descriptions with CTAs, timestamps, and SEO keywords. Free, instant.',
    descB: 'Write YouTube descriptions for your business channel in seconds. Professional tone, CTAs, SEO optimization. AI-generated, free, no signup.',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Grow Your Business YouTube Channel',
    affiliateSubtext: 'vidIQ helps business channels find keywords, track competitors, and optimize for growth. Free plan available.',
    diagnosis: '"youtube business captions" — B2B intent, likely brand managers or small business owners. High value per visitor.',
    hypothesis: '"Brand Channels" framing targets underserved B2B segment. Professional tone signaling should attract business users willing to try paid tools.',
  },

  '/caption-generator/youtube/technology': {
    titleA: 'YouTube Tech Captions — Free AI Generator for Tech Reviews & Tutorials',
    titleB: 'Free AI Caption Generator for YouTube Tech Content — Reviews & Tutorials',
    descA: 'Generate tech-focused YouTube captions with AI. Perfect for reviews, tutorials, unboxings, and tech news. Includes SEO hashtags and CTAs. Free, instant.',
    descB: 'Write YouTube descriptions for tech content in seconds. AI generates captions for reviews, tutorials, and unboxings with SEO optimization. Free.',
    affiliateSlug: 'descript',
    affiliateHeadline: 'Edit Tech Videos Faster',
    affiliateSubtext: 'Descript lets you edit video by editing text — perfect for tutorials and reviews. Try free.',
    diagnosis: '"youtube tech captions" — tech reviewers are high-value audience, often use multiple paid tools. Descript affiliate matches editing-heavy workflow.',
    hypothesis: 'Tech creator audience has high tool adoption rate. Descript pairing matches their editing-heavy workflow. Expected above-average affiliate clicks.',
  },

  '/caption-generator/youtube/gaming': {
    titleA: 'YouTube Gaming Captions — Free AI Generator for Let\'s Plays & Streams',
    titleB: 'Free Gaming YouTube Caption Generator — AI Descriptions for Gamers',
    descA: 'Generate gaming-focused YouTube captions with AI. Perfect for let\'s plays, streams, reviews, and esports content. With trending gaming hashtags. Free, instant.',
    descB: 'Write YouTube gaming descriptions in seconds. AI creates captions for streams, let\'s plays, and game reviews with relevant hashtags. Free, no signup.',
    affiliateSlug: 'opusclip',
    affiliateHeadline: 'Turn Streams into YouTube Shorts',
    affiliateSubtext: 'Got long streams? OpusClip clips the best moments into Shorts automatically — try free.',
    diagnosis: '"youtube gaming captions" — large audience volume (gaming is YouTube\'s #1 category). OpusClip matches the stream-to-shorts pipeline gamers use.',
    hypothesis: 'Gaming is highest-volume YouTube category. Stream-to-Shorts pipeline is common workflow, so OpusClip has natural conversion path.',
  },

  '/caption-generator/instagram/travel': {
    titleA: 'Instagram Travel Captions — Free AI Generator (200+ Ideas)',
    titleB: 'Free Travel Caption Generator for Instagram — AI-Powered, Instant',
    descA: 'Generate wanderlust-worthy Instagram travel captions with AI. Beach, mountain, city, food — with location hashtags and travel CTAs. 200+ ideas, free, instant.',
    descB: 'Need travel captions for Instagram? AI generates location-specific captions with hashtags and hooks. Beach, city, adventure. Free, no signup.',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Create Stunning Travel Photo Grids',
    affiliateSubtext: 'Make your travel feed aesthetic with Canva\'s Instagram templates — free plan.',
    examples: [
      '"The moment I stepped off the plane…" — sensory hook',
      '"This hidden gem changed my entire trip" — curiosity + discovery',
      '"Budget travel hack that saved me $500" — value + specificity',
    ],
    diagnosis: '"instagram travel captions" ~6K monthly. Very competitive but high engagement. "200+ Ideas" in title creates volume expectation that beats competitors listing fewer.',
    hypothesis: '"200+" volume claim differentiates from competitors. Location-specific mention (beach, mountain, city) captures long-tail variations.',
  },

  '/caption-generator/instagram/food': {
    titleA: 'Instagram Food Captions — Free AI Generator (Foodie Approved)',
    titleB: 'Free Food Caption Generator for Instagram — AI Captions & Hashtags',
    descA: 'Generate mouth-watering Instagram food captions with AI. Restaurant reviews, home cooking, recipes — with foodie hashtags and CTAs. Free, instant, no signup.',
    descB: 'Write the perfect Instagram food caption in seconds. AI generates captions for restaurants, recipes, and food blogs with trending hashtags. Free.',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Design a Food Blog That Gets Followers',
    affiliateSubtext: 'Make your food photos pop with Canva\'s Instagram story and post templates — free plan.',
    examples: [
      '"This 5-minute recipe changed everything" — curiosity + ease',
      '"The secret ingredient nobody talks about" — mystery hook',
      '"I recreated this restaurant dish at home" — relatable challenge',
    ],
    diagnosis: '"instagram food captions" ~5K monthly. High engagement niche. "Foodie Approved" branding in title A creates trust signal. Recipe and restaurant angles capture sub-intents.',
    hypothesis: '"Foodie Approved" creates social proof-like trust. Sub-intent mentions (restaurant, cooking, recipes) should capture long-tail traffic.',
  },

  '/caption-generator/instagram/fitness': {
    titleA: 'Instagram Fitness Captions — Free AI Generator (Gym & Workout)',
    titleB: 'Free Fitness Caption Generator for Instagram — AI Workout Captions',
    descA: 'Generate motivating Instagram fitness captions with AI. Gym selfies, workout videos, transformation posts — with fitness hashtags and CTAs. Free, instant.',
    descB: 'Write Instagram fitness captions that inspire action. AI generates gym, workout, and transformation captions with hashtags. Free, no signup.',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Create Fitness Transformation Posts',
    affiliateSubtext: 'Before/after collages, workout plans, progress trackers — design them all in Canva. Free plan.',
    examples: [
      '"Day 1 vs Day 90 — here\'s what actually changed" — transformation hook',
      '"The exercise I avoided for years (and why I was wrong)" — confession hook',
      '"My honest review after 30 days of…" — social proof + timeframe',
    ],
    diagnosis: '"instagram fitness captions" ~4K monthly. Fitness audience is highly engaged and willing to try tools. Gym + Workout in title capture sub-queries.',
    hypothesis: 'Gym/workout sub-mentions capture "gym captions for instagram" and "workout captions" long-tail. Transformation content hooks match fitness search intent.',
  },

  '/caption-generator/instagram/beauty': {
    titleA: 'Instagram Beauty Captions — Free AI Generator (Skincare & Makeup)',
    titleB: 'Free Beauty Caption Generator for Instagram — AI Skincare & Makeup Captions',
    descA: 'Generate stunning Instagram beauty captions with AI. Skincare routines, makeup looks, product reviews — with beauty hashtags and CTAs. Free, instant.',
    descB: 'Write Instagram beauty captions in seconds. AI generates captions for skincare, makeup, and beauty reviews with trending hashtags. Free, no signup.',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Design Gorgeous Beauty Content',
    affiliateSubtext: 'Create before/after edits, product flat lays, and beauty carousels with Canva. Free plan.',
    examples: [
      '"The skincare mistake 90% of people make" — educational hook',
      '"This $8 product replaced my entire routine" — value discovery',
      '"Dermatologist-approved routine for…" — authority hook',
    ],
    diagnosis: '"instagram beauty captions" ~3K monthly. High commercial intent — beauty audience buys products. Skincare & Makeup capture the two main sub-niches.',
    hypothesis: 'Skincare + Makeup dual mention captures both sub-audiences. Educational hooks match beauty content\'s how-to nature.',
  },

  '/caption-generator/tiktok/marketing': {
    titleA: 'TikTok Marketing Captions — Free AI Generator for Brand Content',
    titleB: 'Free TikTok Marketing Caption Generator — AI-Powered Brand Captions',
    descA: 'Generate TikTok marketing captions for brands and businesses. AI creates scroll-stopping hooks with trending sounds strategy and conversion CTAs. Free, instant.',
    descB: 'Write TikTok marketing captions that convert. AI generates brand-appropriate captions with hooks, hashtags, and CTAs. Free, no signup.',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Track TikTok Marketing Performance',
    affiliateSubtext: 'See which TikTok posts drive traffic and sales with Metricool analytics — free plan.',
    diagnosis: '"tiktok marketing captions" — B2B/brand manager intent. Growing fast as brands invest in TikTok. Metricool analytics pairing matches B2B workflow.',
    hypothesis: 'Brand/business framing attracts B2B audience with higher tool adoption. Metricool analytics pairing is natural next step for marketing teams.',
  },

  '/caption-generator/instagram/marketing': {
    titleA: 'Instagram Marketing Captions — Free AI Generator for Brands & Agencies',
    titleB: 'Free Instagram Marketing Caption Generator — AI Captions for Business',
    descA: 'Generate Instagram marketing captions for brands, agencies, and businesses. AI creates conversion-focused captions with CTAs, hashtags, and A/B variants. Free, instant.',
    descB: 'Write Instagram marketing captions that drive sales. AI generates brand captions with proven CTAs and engagement hooks. Free, no signup.',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Manage All Your Brand\'s Social Media',
    affiliateSubtext: 'Schedule, analyze, and optimize your brand\'s Instagram with Metricool — free plan for starters.',
    diagnosis: '"instagram marketing captions" ~4K monthly. Brands & Agencies mention captures B2B segment that competitors ignore. Highest affiliate conversion potential.',
    hypothesis: '"Brands & Agencies" in title A captures underserved B2B queries. "A/B variants" mention in desc differentiates from consumer-focused generators.',
  },
};

/**
 * Get the active override for a page path, or undefined if none exists.
 */
export function getOverride(pagePath: string): SeoOverride | undefined {
  return SEO_OVERRIDES[pagePath];
}

/**
 * Get the active title for a page (respects ACTIVE_VARIANT).
 */
export function getOverrideTitle(pagePath: string): string | undefined {
  const override = SEO_OVERRIDES[pagePath];
  if (!override) return undefined;
  return ACTIVE_VARIANT === 'A' ? override.titleA : override.titleB;
}

/**
 * Get the active description for a page (respects ACTIVE_VARIANT).
 */
export function getOverrideDesc(pagePath: string): string | undefined {
  const override = SEO_OVERRIDES[pagePath];
  if (!override) return undefined;
  return ACTIVE_VARIANT === 'A' ? override.descA : override.descB;
}
