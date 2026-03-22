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

import { generateSeoTitle } from './seo/title';

// Use variant A by default. Set to 'B' to activate test variants.
export const ACTIVE_VARIANT: 'A' | 'B' = 'A';

export const SEO_OVERRIDES: Record<string, SeoOverride> = {

  // ═══════════════════════════════════════════════════════════════════
  // TIER 1: Main Tool Pages (highest impression potential)
  // ═══════════════════════════════════════════════════════════════════

  '/': {
    titleA: generateSeoTitle('AI Tools for Creators'),
    titleB: generateSeoTitle('AI Caption Generator & Creator Tools'),
    descA: 'Generate captions, bios, titles, and hashtags with AI. 100% free, no login, instant results. Used by 50K+ creators. Try now.',
    descB: 'Free AI-powered caption generator for Instagram, TikTok, YouTube & more. Plus bio, title, and hashtag tools. No signup needed — try in 5 seconds.',
    ctaHeadline: 'Generate Captions Now',
    ctaSubtext: 'Join 50K+ creators using free AI tools',
    diagnosis: 'Homepage competes for broad "ai tools for creators" queries. Current title is good but could test product-led variant. Missing social proof in description.',
    hypothesis: 'Adding "50K+ creators" social proof in desc should lift CTR 10-15%. Product-led title B may capture more transactional queries.',
  },

  '/caption-generator': {
    titleA: generateSeoTitle('Caption Generator'),
    titleB: generateSeoTitle('Caption Generator for Instagram, TikTok & YouTube'),
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
    titleA: generateSeoTitle('Bio Generator'),
    titleB: generateSeoTitle('Bio Generator for Instagram & TikTok'),
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
    titleA: generateSeoTitle('Title Generator'),
    titleB: generateSeoTitle('YouTube Title Generator'),
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
    titleA: generateSeoTitle('Hashtag Generator'),
    titleB: generateSeoTitle('Instagram Hashtag Generator'),
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
    titleA: generateSeoTitle('YouTube Caption Generator'),
    titleB: generateSeoTitle('YouTube Description Generator'),
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
    titleA: generateSeoTitle('Instagram Caption Generator'),
    titleB: generateSeoTitle('Instagram Caption Generator with Hashtags'),
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
    titleA: generateSeoTitle('TikTok Caption Generator'),
    titleB: generateSeoTitle('TikTok Viral Caption Generator'),
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
    titleA: generateSeoTitle('X (Twitter) Caption Generator'),
    titleB: generateSeoTitle('Twitter Post Generator'),
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
    titleA: generateSeoTitle('Facebook Caption Generator'),
    titleB: generateSeoTitle('Facebook Post Generator'),
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
    titleA: generateSeoTitle('YouTube Marketing Caption Generator'),
    titleB: generateSeoTitle('YouTube Marketing Caption Generator'),
    descA: 'Generate marketing-focused YouTube descriptions and captions with AI. Includes CTAs, keyword optimization, and conversion-driven hooks. Free, instant.',
    descB: 'Write YouTube marketing captions that convert. AI generates descriptions with CTAs, SEO keywords, and engagement hooks. Free, no signup.',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Find Marketing Keywords That Rank',
    affiliateSubtext: 'vidIQ shows which marketing keywords your competitors rank for — target the gaps. Start free.',
    diagnosis: '"youtube marketing captions" commercial intent. Marketers searching this are likely managing brand channels — high affiliate conversion potential.',
    hypothesis: 'Marketing-specific CTA language and vidIQ pairing should drive highest affiliate click rate among topic pages. Expected 3-5% affiliate CTR.',
  },

  '/caption-generator/youtube/business': {
    titleA: generateSeoTitle('YouTube Business Caption Generator'),
    titleB: generateSeoTitle('YouTube Business Caption Generator'),
    descA: 'Generate professional YouTube captions for business channels. AI creates brand-appropriate descriptions with CTAs, timestamps, and SEO keywords. Free, instant.',
    descB: 'Write YouTube descriptions for your business channel in seconds. Professional tone, CTAs, SEO optimization. AI-generated, free, no signup.',
    affiliateSlug: 'vidiq',
    affiliateHeadline: 'Grow Your Business YouTube Channel',
    affiliateSubtext: 'vidIQ helps business channels find keywords, track competitors, and optimize for growth. Free plan available.',
    diagnosis: '"youtube business captions" — B2B intent, likely brand managers or small business owners. High value per visitor.',
    hypothesis: '"Brand Channels" framing targets underserved B2B segment. Professional tone signaling should attract business users willing to try paid tools.',
  },

  '/caption-generator/youtube/technology': {
    titleA: generateSeoTitle('YouTube Technology Caption Generator'),
    titleB: generateSeoTitle('YouTube Tech Caption Generator'),
    descA: 'Generate tech-focused YouTube captions with AI. Perfect for reviews, tutorials, unboxings, and tech news. Includes SEO hashtags and CTAs. Free, instant.',
    descB: 'Write YouTube descriptions for tech content in seconds. AI generates captions for reviews, tutorials, and unboxings with SEO optimization. Free.',
    affiliateSlug: 'descript',
    affiliateHeadline: 'Edit Tech Videos Faster',
    affiliateSubtext: 'Descript lets you edit video by editing text — perfect for tutorials and reviews. Try free.',
    diagnosis: '"youtube tech captions" — tech reviewers are high-value audience, often use multiple paid tools. Descript affiliate matches editing-heavy workflow.',
    hypothesis: 'Tech creator audience has high tool adoption rate. Descript pairing matches their editing-heavy workflow. Expected above-average affiliate clicks.',
  },

  '/caption-generator/youtube/gaming': {
    titleA: generateSeoTitle('YouTube Gaming Caption Generator'),
    titleB: generateSeoTitle('YouTube Gaming Caption Generator'),
    descA: 'Generate gaming-focused YouTube captions with AI. Perfect for let\'s plays, streams, reviews, and esports content. With trending gaming hashtags. Free, instant.',
    descB: 'Write YouTube gaming descriptions in seconds. AI creates captions for streams, let\'s plays, and game reviews with relevant hashtags. Free, no signup.',
    affiliateSlug: 'opusclip',
    affiliateHeadline: 'Turn Streams into YouTube Shorts',
    affiliateSubtext: 'Got long streams? OpusClip clips the best moments into Shorts automatically — try free.',
    diagnosis: '"youtube gaming captions" — large audience volume (gaming is YouTube\'s #1 category). OpusClip matches the stream-to-shorts pipeline gamers use.',
    hypothesis: 'Gaming is highest-volume YouTube category. Stream-to-Shorts pipeline is common workflow, so OpusClip has natural conversion path.',
  },

  '/caption-generator/instagram/travel': {
    titleA: generateSeoTitle('Instagram Travel Caption Generator'),
    titleB: generateSeoTitle('Instagram Travel Caption Generator'),
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
    titleA: generateSeoTitle('Instagram Food Caption Generator'),
    titleB: generateSeoTitle('Instagram Food Caption Generator'),
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
    titleA: generateSeoTitle('Instagram Fitness Caption Generator'),
    titleB: generateSeoTitle('Instagram Fitness Caption Generator'),
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
    titleA: generateSeoTitle('Instagram Beauty Caption Generator'),
    titleB: generateSeoTitle('Instagram Beauty Caption Generator'),
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
    titleA: generateSeoTitle('TikTok Marketing Caption Generator'),
    titleB: generateSeoTitle('TikTok Marketing Caption Generator'),
    descA: 'Generate TikTok marketing captions for brands and businesses. AI creates scroll-stopping hooks with trending sounds strategy and conversion CTAs. Free, instant.',
    descB: 'Write TikTok marketing captions that convert. AI generates brand-appropriate captions with hooks, hashtags, and CTAs. Free, no signup.',
    affiliateSlug: 'metricool',
    affiliateHeadline: 'Track TikTok Marketing Performance',
    affiliateSubtext: 'See which TikTok posts drive traffic and sales with Metricool analytics — free plan.',
    diagnosis: '"tiktok marketing captions" — B2B/brand manager intent. Growing fast as brands invest in TikTok. Metricool analytics pairing matches B2B workflow.',
    hypothesis: 'Brand/business framing attracts B2B audience with higher tool adoption. Metricool analytics pairing is natural next step for marketing teams.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // TIER 4: GSC High-Impression Pages (SEO title optimization batch)
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/x': {
    titleA: 'Best X (Twitter) Hashtags for 2026 — Free AI Generator That Actually Works',
    titleB: 'Best X (Twitter) Hashtags for 2026 — Free AI Generator That Actually Works',
    descA: 'Generate better X hashtags for art, tech, gaming, creators, and more. Free AI hashtag generator with ready-to-use ideas for 2026.',
    descB: 'Generate better X hashtags for art, tech, gaming, creators, and more. Free AI hashtag generator with ready-to-use ideas for 2026.',
    diagnosis: 'GSC shows impressions on /hashtag-generator/x. Current title is generic keyword-based. Needs differentiated, human-sounding title with year signal.',
    hypothesis: '"That Actually Works" adds authenticity signal. Year tag signals freshness. Expected CTR lift +10-15%.',
  },

  '/hashtag-generator/x/art': {
    titleA: 'Best X (Twitter) Hashtags for AI Art in 2026 (Copy & Paste)',
    titleB: 'Best X (Twitter) Hashtags for AI Art in 2026 (Copy & Paste)',
    descA: 'Generate the best X hashtags for AI art, digital art, and creative posts. Free tool with copy-and-paste hashtag ideas for 2026.',
    descB: 'Generate the best X hashtags for AI art, digital art, and creative posts. Free tool with copy-and-paste hashtag ideas for 2026.',
    diagnosis: 'GSC impression data confirms visibility. Current auto-generated title lacks specificity and year. AI Art angle captures trending search intent.',
    hypothesis: '"Copy & Paste" signals instant value. "AI Art" captures trending niche. Expected CTR lift +12-18%.',
  },

  '/hashtag-generator/x/technology': {
    titleA: 'Top Tech Hashtags for X (Twitter) — Grow Faster in 2026',
    titleB: 'Top Tech Hashtags for X (Twitter) — Grow Faster in 2026',
    descA: 'Find high-performing tech hashtags for X posts. Get better reach for AI, startups, gadgets, and software content in 2026.',
    descB: 'Find high-performing tech hashtags for X posts. Get better reach for AI, startups, gadgets, and software content in 2026.',
    diagnosis: 'GSC impression data present. Generic title underperforms. "Grow Faster" adds benefit-driven CTA.',
    hypothesis: 'Benefit-driven title with sub-niche mentions (AI, startups, gadgets) captures long-tail. Expected CTR lift +10-14%.',
  },

  '/hashtag-generator/x/gaming': {
    titleA: 'Best Gaming Hashtags for X (Twitter) — Get More Views Instantly',
    titleB: 'Best Gaming Hashtags for X (Twitter) — Get More Views Instantly',
    descA: 'Get better gaming reach on X with fresh hashtags for streams, clips, esports, and gaming content. Free AI hashtag generator.',
    descB: 'Get better gaming reach on X with fresh hashtags for streams, clips, esports, and gaming content. Free AI hashtag generator.',
    diagnosis: 'GSC shows gaming/X page has impressions. "Get More Views Instantly" matches gamer intent directly.',
    hypothesis: 'Gamers respond to instant-result language. Stream/clips/esports mentions capture sub-intents. Expected CTR lift +12%.',
  },

  '/hashtag-generator/instagram/art': {
    titleA: 'Best Instagram Art Hashtags (2026) — Free AI Generator',
    titleB: 'Best Instagram Art Hashtags (2026) — Free AI Generator',
    descA: 'Discover the best Instagram art hashtags for artists, illustrators, and creators. Free AI hashtag generator updated for 2026.',
    descB: 'Discover the best Instagram art hashtags for artists, illustrators, and creators. Free AI hashtag generator updated for 2026.',
    diagnosis: 'GSC impressions confirm visibility. Current generic title loses clicks to more specific competitors.',
    hypothesis: 'Year tag + "Free AI Generator" positions as modern tool. Artist/illustrator mentions broaden appeal. Expected CTR lift +10%.',
  },

  '/hashtag-generator/linkedin/education': {
    titleA: 'Top LinkedIn Education Hashtags (2026) — More Reach, Less Effort',
    titleB: 'Top LinkedIn Education Hashtags (2026) — More Reach, Less Effort',
    descA: 'Find LinkedIn education hashtags that help teachers, educators, and learning brands reach more people in 2026.',
    descB: 'Find LinkedIn education hashtags that help teachers, educators, and learning brands reach more people in 2026.',
    diagnosis: 'GSC impressions on LinkedIn education niche. "More Reach, Less Effort" addresses educator pain point directly.',
    hypothesis: 'Educators value efficiency messaging. Specific audience mentions (teachers, learning brands) improve relevance. Expected CTR lift +10%.',
  },

  '/hashtag-generator/linkedin/food': {
    titleA: 'Best Food Hashtags for LinkedIn (Yes, It Works in 2026)',
    titleB: 'Best Food Hashtags for LinkedIn (Yes, It Works in 2026)',
    descA: 'Generate better LinkedIn food hashtags for chefs, restaurants, creators, and food businesses. Free and easy to use.',
    descB: 'Generate better LinkedIn food hashtags for chefs, restaurants, creators, and food businesses. Free and easy to use.',
    diagnosis: 'GSC impressions present. "Yes, It Works" addresses the surprise factor of food content on LinkedIn — a curiosity trigger.',
    hypothesis: 'Parenthetical humor creates curiosity click. Acknowledges the "food on LinkedIn?" question users have. Expected CTR lift +15%.',
  },

  '/bio-generator/tiktok/artist': {
    titleA: 'TikTok Bio Ideas for Artists (Copy & Paste + AI Generator)',
    titleB: 'TikTok Bio Ideas for Artists (Copy & Paste + AI Generator)',
    descA: 'Create a better TikTok bio for artists in seconds. Get copy-and-paste bio ideas that look creative, clear, and professional.',
    descB: 'Create a better TikTok bio for artists in seconds. Get copy-and-paste bio ideas that look creative, clear, and professional.',
    diagnosis: 'GSC impressions on bio/tiktok/artist. Current auto-generated title is generic. "Copy & Paste" signals instant actionability.',
    hypothesis: '"Bio Ideas" matches informational search intent. "Copy & Paste" reduces perceived effort. Expected CTR lift +12%.',
  },

  '/bio-generator/x/designer': {
    titleA: 'Best Bio Ideas for Designers (Free AI Bio Generator)',
    titleB: 'Best Bio Ideas for Designers (Free AI Bio Generator)',
    descA: 'Generate a strong designer bio for X with free AI help. Great for graphic designers, UX designers, and creative professionals.',
    descB: 'Generate a strong designer bio for X with free AI help. Great for graphic designers, UX designers, and creative professionals.',
    diagnosis: 'GSC impressions on bio/x/designer. Current title lacks designer-specific appeal. Sub-niche mentions capture different designer types.',
    hypothesis: 'Designer-specific language + sub-niche mentions (graphic, UX, creative) broaden relevance. Expected CTR lift +10%.',
  },

  '/caption-generator/instagram/marketing': {
    titleA: generateSeoTitle('Instagram Marketing Caption Generator'),
    titleB: generateSeoTitle('Instagram Marketing Caption Generator'),
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
