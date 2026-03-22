/**
 * SEO Title & Description Overrides — Full Coverage for All GSC-Exposed Pages.
 *
 * Updated 2026-03-23: High-CTR title overhaul.
 * Every page with GSC impressions now has an explicit, human-crafted title
 * designed to maximize click-through rate on SERP.
 *
 * Rules applied:
 * - 2026 year tag for freshness signal
 * - Result-oriented power words (not spammy)
 * - No double-brand suffix (metadata.ts uses absolute title for overrides)
 * - Every impression page covered — no gaps
 */

export interface SeoOverride {
  titleA: string;
  titleB: string;
  descA: string;
  descB: string;
  ctaHeadline?: string;
  ctaSubtext?: string;
  affiliateSlug?: string;
  affiliateHeadline?: string;
  affiliateSubtext?: string;
  contentH2?: string;
  contentIntro?: string;
  examples?: string[];
  diagnosis?: string;
  hypothesis?: string;
}

// Use variant A by default. Set to 'B' to activate test variants.
export const ACTIVE_VARIANT: 'A' | 'B' = 'A';

/** Compact override helper for pages that only need title + desc */
function o(title: string, desc: string, extra?: Partial<SeoOverride>): SeoOverride {
  return { titleA: title, titleB: title, descA: desc, descB: desc, ...extra };
}

export const SEO_OVERRIDES: Record<string, SeoOverride> = {

  // ═══════════════════════════════════════════════════════════════════
  // CORE TOOL PAGES
  // ═══════════════════════════════════════════════════════════════════

  '/': o(
    'Free AI Tools for Creators (2026) — Captions, Bios, Titles & Hashtags',
    'Generate captions, bios, titles, and hashtags with AI. 100% free, no login, instant results. Used by 50K+ creators.',
    {
      ctaHeadline: 'Generate Captions Now',
      ctaSubtext: 'Join 50K+ creators using free AI tools',
    },
  ),

  '/caption-generator': o(
    'Caption Generator (2026) — Write High-Converting Captions Fast',
    'Generate scroll-stopping captions with AI in 5 seconds. Includes hashtags, CTAs, and short variants. Free, no signup. Instagram, TikTok, YouTube, X & Facebook.',
    {
      ctaHeadline: 'Generate Your Caption Now',
      ctaSubtext: 'Free forever — no login, no limits',
      affiliateSlug: 'metricool',
      affiliateHeadline: 'Schedule Your Captions Automatically',
      affiliateSubtext: 'Generated your captions? Schedule them across all platforms with Metricool — free plan available.',
    },
  ),

  '/bio-generator': o(
    'Free Bio Generator (2026) — Create the Perfect Bio in Seconds',
    'Generate the perfect social media bio with AI. Optimized for Instagram, TikTok, LinkedIn, YouTube. 17 bio options per generation. Free, instant.',
    {
      ctaHeadline: 'Generate Your Bio Now',
      ctaSubtext: '17 bio options in one click — free',
      affiliateSlug: 'canva',
      affiliateHeadline: 'Make Your Profile Stand Out',
      affiliateSubtext: 'Great bio + great visuals = more followers. Design profile pics and covers with Canva — free plan.',
    },
  ),

  '/title-generator': o(
    'Free Title Generator (2026) — Create Viral Titles Instantly',
    'Generate click-worthy titles for YouTube, blogs & newsletters with AI. 10+ title ideas with SEO optimization. Free, no signup.',
    {
      ctaHeadline: 'Generate Titles Now',
      ctaSubtext: '10+ title ideas in one click',
      affiliateSlug: 'vidiq',
      affiliateHeadline: 'Get More Views with Better SEO',
      affiliateSubtext: 'Great title + great SEO = more views. vidIQ shows you exactly what keywords to target — start free.',
    },
  ),

  '/hashtag-generator': o(
    'Free Hashtag Generator (2026) — Trending Tags for Every Platform',
    'Generate 30+ trending hashtags for Instagram, TikTok, YouTube & X with AI. Niche-specific, copy-ready sets. Free, instant.',
    {
      ctaHeadline: 'Generate Hashtags Now',
      ctaSubtext: '30+ hashtags in one click — free',
      affiliateSlug: 'metricool',
      affiliateHeadline: 'Track Which Hashtags Actually Work',
      affiliateSubtext: 'Track which hashtags drive reach with Metricool analytics — free plan available.',
    },
  ),

  '/youtube-title-generator': o(
    'YouTube Title Generator (2026) — Get More Views Fast',
    'Generate click-worthy YouTube titles with AI. SEO-optimized, with power words and character counts. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // CAPTION GENERATOR — PLATFORM HUBS
  // ═══════════════════════════════════════════════════════════════════

  '/caption-generator/youtube': o(
    'YouTube Description Generator (2026) — Rank Higher, Get Views',
    'Generate optimized YouTube descriptions and captions with AI. Includes hashtags, timestamps, and CTAs. Free, instant, built for YouTubers.',
    {
      ctaHeadline: 'Generate YouTube Captions Now',
      affiliateSlug: 'vidiq',
      affiliateHeadline: 'Rank Higher on YouTube',
      affiliateSubtext: 'Pair your captions with vidIQ keyword data to rank for the right searches — start free.',
    },
  ),

  '/caption-generator/instagram': o(
    'Instagram Caption Generator (2026) — Get More Likes & Comments',
    'Generate Instagram captions that get likes, comments, and saves. AI creates captions with hashtags, CTAs, and the perfect hook. Free, works for Reels too.',
    {
      ctaHeadline: 'Generate Instagram Captions Now',
      affiliateSlug: 'metricool',
      affiliateHeadline: 'Schedule & Analyze Your Instagram Posts',
      affiliateSubtext: 'Post your captions at the best time with Metricool — free scheduling.',
    },
  ),

  '/caption-generator/tiktok': o(
    'TikTok Caption Generator (2026) — Go Viral Faster',
    'Generate TikTok captions that stop the scroll. AI-powered with trending hooks, hashtags, and CTAs. Free, instant, no signup.',
    {
      ctaHeadline: 'Generate TikTok Captions Now',
      affiliateSlug: 'opusclip',
      affiliateHeadline: 'Turn Long Videos into TikTok Clips',
      affiliateSubtext: 'Got long-form content? OpusClip turns it into viral TikTok clips — try free.',
    },
  ),

  '/caption-generator/x': o(
    'X (Twitter) Post Generator (2026) — Write Better Tweets Fast',
    'Generate punchy tweets, thread starters, and X posts with AI. Optimized for engagement. Free, instant.',
    {
      ctaHeadline: 'Generate X Posts Now',
      affiliateSlug: 'metricool',
      affiliateHeadline: 'Schedule Your Tweets for Maximum Reach',
      affiliateSubtext: 'Post at the perfect time with Metricool — schedule X/Twitter & more. Free plan.',
    },
  ),

  '/caption-generator/facebook': o(
    'Facebook Caption Generator (2026) — Get More Shares & Comments',
    'Generate engaging Facebook posts for pages, groups, and profiles with AI. Shareable hooks, CTAs, ideal post length. Free, instant.',
    {
      ctaHeadline: 'Generate Facebook Posts Now',
      affiliateSlug: 'canva',
      affiliateHeadline: 'Create Scroll-Stopping Facebook Graphics',
      affiliateSubtext: 'Great post + great visual = more reach. Design Facebook graphics with Canva — free plan.',
    },
  ),

  // ═══════════════════════════════════════════════════════════════════
  // CAPTION GENERATOR — PLATFORM/TOPIC (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/caption-generator/instagram/business': o(
    'Instagram Business Captions (2026) — Drive Sales & Engagement',
    'Generate business captions for Instagram with AI. Professional CTAs, brand-friendly hooks, hashtags. Free, instant.',
  ),

  '/caption-generator/instagram/fitness': o(
    'Fitness Captions for Instagram (2026) — Inspire & Grow Your Audience',
    'Generate motivating fitness captions for Instagram. Gym, workout, transformation posts with hashtags. Free AI tool.',
    {
      affiliateSlug: 'canva',
      affiliateHeadline: 'Create Fitness Transformation Posts',
      affiliateSubtext: 'Before/after collages, workout plans, progress trackers — design them in Canva. Free plan.',
    },
  ),

  '/caption-generator/instagram/gaming': o(
    'Gaming Captions for Instagram (2026) — Level Up Your Posts',
    'Generate gaming captions for Instagram with AI. Stream clips, game reviews, esports content. Free, instant.',
  ),

  '/caption-generator/instagram/pets': o(
    'Pet Captions for Instagram (2026) — Adorable Posts That Go Viral',
    'Generate cute pet captions for Instagram. Dog, cat, and animal posts with hashtags and CTAs. Free AI tool.',
  ),

  '/caption-generator/instagram/beauty': {
    titleA: 'Beauty Captions for Instagram (2026) — Stunning Posts That Get Saves',
    titleB: 'Beauty Captions for Instagram (2026) — Stunning Posts That Get Saves',
    descA: 'Generate beauty captions for Instagram with AI. Skincare, makeup, product reviews with trending hashtags. Free, instant.',
    descB: 'Generate beauty captions for Instagram with AI. Skincare, makeup, product reviews with trending hashtags. Free, instant.',
    affiliateSlug: 'canva',
    affiliateHeadline: 'Design Gorgeous Beauty Content',
    affiliateSubtext: 'Create before/after edits, product flat lays, and beauty carousels with Canva. Free plan.',
  },

  '/caption-generator/instagram/travel': o(
    'Travel Captions for Instagram (2026) — Wanderlust Posts That Get Likes',
    'Generate travel captions for Instagram. Beach, mountain, city, food — with location hashtags. 200+ ideas, free, instant.',
    {
      affiliateSlug: 'canva',
      affiliateHeadline: 'Create Stunning Travel Photo Grids',
      affiliateSubtext: 'Make your travel feed aesthetic with Canva Instagram templates — free plan.',
    },
  ),

  '/caption-generator/instagram/food': o(
    'Food Captions for Instagram (2026) — Posts That Make Followers Hungry',
    'Generate food captions for Instagram. Restaurant reviews, home cooking, recipes — with foodie hashtags. Free AI tool.',
    {
      affiliateSlug: 'canva',
      affiliateHeadline: 'Design a Food Blog That Gets Followers',
      affiliateSubtext: 'Make your food photos pop with Canva Instagram templates — free plan.',
    },
  ),

  '/caption-generator/instagram/marketing': o(
    'Marketing Captions for Instagram (2026) — Convert Followers to Customers',
    'Generate Instagram marketing captions for brands and businesses. Conversion-focused CTAs, hashtags, and A/B variants. Free, instant.',
    {
      affiliateSlug: 'metricool',
      affiliateHeadline: 'Manage All Your Brand Social Media',
      affiliateSubtext: 'Schedule, analyze, and optimize your brand Instagram with Metricool — free plan.',
    },
  ),

  // Caption — X (Twitter) topic pages
  '/caption-generator/x/education': o(
    'X Education Posts (2026) — Share Knowledge, Get Reach',
    'Generate education-focused X posts with AI. Share insights, tips, and threads that get engagement. Free, instant.',
  ),

  '/caption-generator/x/fashion': o(
    'Fashion Posts for X (2026) — Style That Gets Clicks',
    'Generate fashion captions for X with AI. Trendy, bold, and shareable. Free, instant, no signup.',
  ),

  '/caption-generator/x/travel': o(
    'Travel Posts for X (2026) — Inspire Your Followers Instantly',
    'Generate travel captions for X with AI. Adventure, destinations, and wanderlust posts. Free, instant.',
  ),

  // Caption — YouTube topic pages
  '/caption-generator/youtube/marketing': o(
    'YouTube Marketing Descriptions (2026) — Captions That Convert',
    'Generate marketing-focused YouTube descriptions with AI. CTAs, keyword optimization, conversion hooks. Free, instant.',
    {
      affiliateSlug: 'vidiq',
      affiliateHeadline: 'Find Marketing Keywords That Rank',
      affiliateSubtext: 'vidIQ shows which marketing keywords your competitors rank for — start free.',
    },
  ),

  '/caption-generator/youtube/business': o(
    'YouTube Business Descriptions (2026) — Professional & SEO-Ready',
    'Generate professional YouTube descriptions for business channels. Brand-appropriate CTAs, timestamps, SEO keywords. Free, instant.',
    { affiliateSlug: 'vidiq' },
  ),

  '/caption-generator/youtube/technology': o(
    'YouTube Tech Descriptions (2026) — Reviews, Tutorials & More',
    'Generate tech-focused YouTube descriptions with AI. Reviews, tutorials, unboxings with SEO hashtags. Free, instant.',
    { affiliateSlug: 'descript' },
  ),

  '/caption-generator/youtube/gaming': o(
    'YouTube Gaming Descriptions (2026) — Streams, Reviews & Let\'s Plays',
    'Generate gaming YouTube descriptions with AI. Let\'s plays, streams, reviews, esports with trending hashtags. Free, instant.',
    { affiliateSlug: 'opusclip' },
  ),

  '/caption-generator/tiktok/marketing': o(
    'TikTok Marketing Captions (2026) — Hooks That Convert',
    'Generate TikTok marketing captions for brands. Scroll-stopping hooks, trending sounds strategy, CTAs. Free, instant.',
    { affiliateSlug: 'metricool' },
  ),

  // ═══════════════════════════════════════════════════════════════════
  // CAPTION GENERATOR — PLATFORM/TOPIC/TONE (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/caption-generator/facebook/education/friendly': o(
    'Friendly Education Captions for Facebook (2026) — Engage & Teach',
    'Generate friendly, educational Facebook captions with AI. Perfect for teachers, tutors, and learning pages. Free, instant.',
  ),

  '/caption-generator/facebook/food/inspirational': o(
    'Inspirational Food Captions for Facebook (2026) — Share the Love',
    'Generate inspirational food captions for Facebook. Recipes, restaurant moments, and foodie posts. Free AI tool.',
  ),

  '/caption-generator/facebook/gaming/inspirational': o(
    'Gaming Captions for Facebook (2026) — Inspire Fellow Gamers',
    'Generate inspirational gaming captions for Facebook. Stream highlights, wins, and community posts. Free, instant.',
  ),

  '/caption-generator/facebook/marketing/cute': o(
    'Cute Marketing Captions for Facebook (2026) — Brand Posts That Charm',
    'Generate cute, brand-friendly marketing captions for Facebook. Shareable, engaging, and on-brand. Free AI tool.',
  ),

  '/caption-generator/instagram/beauty/luxury': o(
    'Luxury Beauty Captions for Instagram (2026) — Elegant & On-Trend',
    'Generate luxury beauty captions for Instagram. High-end skincare, designer makeup, and premium aesthetics. Free, instant.',
  ),

  '/caption-generator/instagram/fashion/persuasive': o(
    'Fashion Captions for Instagram That Convert (2026)',
    'Generate persuasive fashion captions for Instagram. Style tips, outfit reveals, and shopping CTAs. Free AI tool.',
  ),

  '/caption-generator/instagram/marketing/persuasive': o(
    'Marketing Captions for Instagram That Sell (2026)',
    'Generate persuasive marketing captions for Instagram. Sales hooks, CTAs, and conversion-focused copy. Free, instant.',
  ),

  '/caption-generator/instagram/music/friendly': o(
    'Music Captions for Instagram (2026) — Friendly Vibes That Resonate',
    'Generate friendly music captions for Instagram. Song shares, concert moments, and playlist posts. Free AI tool.',
  ),

  '/caption-generator/tiktok/business/funny': o(
    'Funny Business Captions for TikTok (2026) — Humor That Sells',
    'Generate funny business TikTok captions with AI. Professional humor that builds trust and goes viral. Free, instant.',
  ),

  '/caption-generator/tiktok/education/friendly': o(
    'Education Captions for TikTok (2026) — Learn, Laugh & Share',
    'Generate friendly education TikTok captions. Make learning fun with engaging hooks and hashtags. Free AI tool.',
  ),

  '/caption-generator/tiktok/food/minimalist': o(
    'Clean Food Captions for TikTok (2026) — Short, Viral & Appetizing',
    'Generate minimalist food TikTok captions. Clean, punchy text for recipe clips and food reveals. Free, instant.',
  ),

  '/caption-generator/x/fashion/sarcastic': o(
    'Sarcastic Fashion Captions for X (2026) — Bold & Viral',
    'Generate sarcastic fashion captions for X. Witty, bold, and shareable style commentary. Free AI tool.',
  ),

  '/caption-generator/x/gaming/minimalist': o(
    'Clean Gaming Captions for X (2026) — Short & Punchy',
    'Generate minimalist gaming captions for X. Short, impactful posts for clips and highlights. Free, instant.',
  ),

  '/caption-generator/x/lifestyle/funny': o(
    'Funny Lifestyle Captions for X (2026) — Relatable Posts That Pop',
    'Generate funny lifestyle captions for X. Witty observations, daily life humor, and relatable takes. Free AI tool.',
  ),

  '/caption-generator/x/lifestyle/minimalist': o(
    'Minimalist Lifestyle Captions for X (2026) — Less Words, More Impact',
    'Generate clean, minimalist lifestyle captions for X. Short, aesthetic, and impactful. Free, instant.',
  ),

  '/caption-generator/x/marketing/funny': o(
    'Funny Marketing Posts for X (2026) — Humor That Gets Shares',
    'Generate funny marketing captions for X. Brand humor that drives engagement and shares. Free AI tool.',
  ),

  '/caption-generator/x/music/friendly': o(
    'Music Posts for X (2026) — Friendly & Engaging Tweets',
    'Generate friendly music captions for X. Song recommendations, artist shoutouts, and playlist shares. Free, instant.',
  ),

  '/caption-generator/x/photography/professional': o(
    'Photography Captions for X (2026) — Professional & Sharp',
    'Generate professional photography captions for X. Showcase your portfolio with polished, engaging posts. Free AI tool.',
  ),

  '/caption-generator/x/food/professional': o(
    'Professional Food Posts for X (2026) — Chef-Level Captions',
    'Generate professional food captions for X. Restaurant reviews, culinary tips, and food industry posts. Free, instant.',
  ),

  '/caption-generator/x/motivation/cute': o(
    'Cute Motivation Posts for X (2026) — Uplift Your Followers',
    'Generate cute motivational captions for X. Positive vibes, encouragement, and feel-good posts. Free AI tool.',
  ),

  '/caption-generator/x/technology/persuasive': o(
    'Tech Posts for X That Actually Convert (2026)',
    'Generate persuasive tech captions for X. Product launches, reviews, and tech insights that drive clicks. Free, instant.',
  ),

  '/caption-generator/x/technology/sarcastic': o(
    'Sarcastic Tech Posts for X (2026) — Bold Takes That Go Viral',
    'Generate sarcastic tech captions for X. Witty commentary on AI, startups, and tech trends. Free AI tool.',
  ),

  '/caption-generator/youtube/beauty/luxury': o(
    'Luxury Beauty Descriptions for YouTube (2026) — Elegant & SEO-Ready',
    'Generate luxury beauty YouTube descriptions. High-end product reviews, skincare routines, and premium content. Free, instant.',
  ),

  '/caption-generator/youtube/fashion/minimalist': o(
    'Minimalist Fashion Descriptions for YouTube (2026) — Clean & Stylish',
    'Generate minimalist fashion YouTube descriptions. Capsule wardrobes, style tips, and aesthetic content. Free AI tool.',
  ),

  '/caption-generator/youtube/lifestyle/cute': o(
    'Cute Lifestyle Descriptions for YouTube (2026) — Charming & Clickable',
    'Generate cute lifestyle YouTube descriptions. Daily vlogs, cozy content, and feel-good videos. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // HASHTAG GENERATOR — X (Twitter) Topics
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/x': o(
    'Best X (Twitter) Hashtags (2026) — Free AI Generator That Works',
    'Generate trending X hashtags for art, tech, gaming, and more. Free AI hashtag generator with copy-paste ideas for 2026.',
  ),

  '/hashtag-generator/x/art': o(
    'Best X Art Hashtags 2026 — Go Viral Instantly',
    'Generate the best X hashtags for AI art, digital art, and creative posts. Copy-paste ready, free tool for 2026.',
  ),

  '/hashtag-generator/x/music': o(
    'Best X Music Hashtags 2026 — Boost Your Posts Fast',
    'Get trending music hashtags for X. Artists, producers, and music lovers — grow your reach in 2026. Free AI tool.',
  ),

  '/hashtag-generator/x/technology': o(
    'Best Tech Hashtags for X (2026) — More Reach in Seconds',
    'Find high-performing tech hashtags for X posts. AI, startups, gadgets, and software content. Free, instant.',
  ),

  '/hashtag-generator/x/gaming': o(
    'Gaming Hashtags That Actually Work (2026 Guide)',
    'Get better gaming reach on X with fresh hashtags for streams, clips, esports. Free AI hashtag generator.',
  ),

  '/hashtag-generator/x/ai': o(
    'Best AI Hashtags for X 2026 — Get Seen Fast',
    'Generate trending AI hashtags for X. Machine learning, ChatGPT, AI tools — grow your audience. Free, instant.',
  ),

  '/hashtag-generator/x/startup': o(
    'Startup Hashtags for X That Drive Growth (2026)',
    'Get the best startup hashtags for X. Founders, VCs, and indie hackers — reach your audience in 2026. Free tool.',
  ),

  '/hashtag-generator/x/business': o(
    'Best Business Hashtags for X (2026) — Reach More People',
    'Generate business hashtags for X that get impressions. B2B, entrepreneurship, and brand content. Free, instant.',
  ),

  '/hashtag-generator/x/design': o(
    'Design Hashtags for X That Actually Get Engagement (2026)',
    'Get the best design hashtags for X. UI/UX, graphic design, and creative portfolios. Free AI generator.',
  ),

  '/hashtag-generator/x/fitness': o(
    'Top Fitness Hashtags for X 2026 — Grow Your Audience',
    'Generate fitness hashtags for X that get real reach. Gym, workout, and wellness content. Free, instant.',
  ),

  '/hashtag-generator/x/crypto': o(
    'Crypto Hashtags for X That Still Work in 2026',
    'Get trending crypto hashtags for X. Bitcoin, DeFi, Web3, and blockchain content. Free AI generator.',
  ),

  '/hashtag-generator/x/beauty': o(
    'Beauty Hashtags for X That Get Real Engagement (2026)',
    'Generate beauty hashtags for X. Skincare, makeup, and beauty trends that drive reach. Free, instant.',
  ),

  '/hashtag-generator/x/education': o(
    'Education Hashtags for X That Boost Your Reach (2026)',
    'Get the best education hashtags for X. Teachers, tutors, and learning content. Free AI generator.',
  ),

  '/hashtag-generator/x/pets': o(
    'Best Pet Hashtags for X (2026) — Get More Reach Fast',
    'Generate pet hashtags for X. Dogs, cats, and animal content that gets engagement. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // HASHTAG GENERATOR — Instagram Topics
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/instagram/art': o(
    'Best Instagram Art Hashtags 2026 — Get More Likes Fast',
    'Discover the best Instagram art hashtags for artists, illustrators, and creators. Free AI generator for 2026.',
  ),

  '/hashtag-generator/instagram/music': o(
    'Top Instagram Music Hashtags (2026) — Grow Instantly',
    'Get trending music hashtags for Instagram. Musicians, DJs, and music lovers — grow your reach. Free AI tool.',
  ),

  '/hashtag-generator/instagram/fitness': o(
    'Fitness Hashtags That Explode on Instagram (2026)',
    'Generate the best fitness hashtags for Instagram. Gym, workout, and wellness tags that get real reach. Free, instant.',
  ),

  '/hashtag-generator/instagram/fashion': o(
    'Best Fashion Hashtags for Instagram 2026 — Go Viral',
    'Get trending fashion hashtags for Instagram. Style, outfits, and OOTD tags that drive engagement. Free AI tool.',
  ),

  '/hashtag-generator/instagram/food': o(
    'Food Hashtags That Actually Work on Instagram (2026)',
    'Generate the best food hashtags for Instagram. Recipes, restaurants, and foodie content. Free, copy-paste ready.',
  ),

  '/hashtag-generator/instagram/travel': o(
    'Travel Hashtags for Instagram That Get You Seen (2026)',
    'Get the best travel hashtags for Instagram. Destinations, wanderlust, and adventure tags. Free AI generator.',
  ),

  '/hashtag-generator/instagram/photography': o(
    'Photography Hashtags That Boost Reach (Instagram 2026)',
    'Generate photography hashtags for Instagram that get real engagement. Landscape, portrait, street photo tags. Free tool.',
  ),

  '/hashtag-generator/instagram/business': o(
    'Instagram Business Hashtags That Drive Growth (2026)',
    'Get the best business hashtags for Instagram. Brands, entrepreneurs, and marketing content. Free AI generator.',
  ),

  '/hashtag-generator/instagram/pets': o(
    'Best Pet Hashtags for Instagram (2026) — Go Viral with Your Pets',
    'Generate pet hashtags for Instagram. Dogs, cats, and adorable animal content. Free, copy-paste ready.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // HASHTAG GENERATOR — LinkedIn Topics
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/linkedin/education': o(
    'Top LinkedIn Education Hashtags 2026 — Grow Faster Today',
    'Find LinkedIn education hashtags that help teachers, educators, and learning brands reach more people in 2026.',
  ),

  '/hashtag-generator/linkedin/music': o(
    'LinkedIn Music Hashtags That Get You Seen (2026)',
    'Get the best music industry hashtags for LinkedIn. Artists, labels, and music business content. Free AI tool.',
  ),

  '/hashtag-generator/linkedin/business': o(
    'Best LinkedIn Business Hashtags (2026) — Get More Reach',
    'Generate business hashtags for LinkedIn that get impressions. B2B, leadership, and strategy content. Free, instant.',
  ),

  '/hashtag-generator/linkedin/marketing': o(
    'LinkedIn Marketing Hashtags That Actually Work (2026)',
    'Get trending marketing hashtags for LinkedIn. Content marketing, growth, and digital strategy. Free AI generator.',
  ),

  '/hashtag-generator/linkedin/startup': o(
    'Startup Hashtags for LinkedIn That Drive Growth (2026)',
    'Generate startup hashtags for LinkedIn. Founders, fundraising, and innovation content. Free, copy-paste ready.',
  ),

  '/hashtag-generator/linkedin/ai': o(
    'AI Hashtags for LinkedIn That Boost Visibility (2026)',
    'Get the best AI hashtags for LinkedIn. Machine learning, AI tools, and tech leadership content. Free AI generator.',
  ),

  '/hashtag-generator/linkedin/food': o(
    'Best Food Hashtags for LinkedIn (Yes, It Works in 2026)',
    'Generate LinkedIn food hashtags for chefs, restaurants, creators, and food businesses. Free and easy to use.',
  ),

  '/hashtag-generator/linkedin/art': o(
    'Best Art Hashtags for LinkedIn (2026) — Stand Out Creatively',
    'Get art hashtags for LinkedIn. Creative professionals, portfolios, and design content. Free AI generator.',
  ),

  '/hashtag-generator/linkedin/fitness': o(
    'Fitness Hashtags for LinkedIn That Actually Work (2026)',
    'Generate fitness industry hashtags for LinkedIn. Coaches, trainers, and wellness brands. Free, instant.',
  ),

  '/hashtag-generator/linkedin/photography': o(
    'Photography Hashtags for LinkedIn (2026) — Get Noticed Fast',
    'Get photography hashtags for LinkedIn. Professional photographers and visual content creators. Free AI tool.',
  ),

  '/hashtag-generator/linkedin/travel': o(
    'Travel Hashtags for LinkedIn That Boost Visibility (2026)',
    'Generate travel industry hashtags for LinkedIn. Tourism, hospitality, and travel content. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // HASHTAG GENERATOR — TikTok Topics
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/tiktok/fitness': o(
    'Best TikTok Fitness Hashtags 2026 — Go Viral Faster',
    'Generate trending fitness hashtags for TikTok. Gym, workout, and wellness tags that get views. Free, instant.',
  ),

  '/hashtag-generator/tiktok/music': o(
    'TikTok Music Hashtags That Actually Work (2026)',
    'Get trending music hashtags for TikTok. Sounds, artists, and music content that goes viral. Free AI tool.',
  ),

  '/hashtag-generator/tiktok/fashion': o(
    'Fashion Hashtags That Explode on TikTok (2026)',
    'Generate fashion hashtags for TikTok. OOTD, style tips, and outfit reveals that get views. Free, instant.',
  ),

  '/hashtag-generator/tiktok/food': o(
    'TikTok Food Hashtags That Get Massive Views (2026)',
    'Generate food hashtags for TikTok. Recipes, mukbang, and food reveals that go viral. Free AI generator.',
  ),

  '/hashtag-generator/tiktok/travel': o(
    'Travel Hashtags for TikTok That Go Viral (2026)',
    'Get trending travel hashtags for TikTok. Destinations, adventures, and travel tips. Free, copy-paste ready.',
  ),

  '/hashtag-generator/tiktok/ai': o(
    'AI Hashtags for TikTok That Get You Seen (2026)',
    'Generate AI hashtags for TikTok. Tech trends, AI tools, and futuristic content. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // HASHTAG GENERATOR — YouTube Topics
  // ═══════════════════════════════════════════════════════════════════

  '/hashtag-generator/youtube': o(
    'Best YouTube Hashtags (2026) — Get More Views & Subscribers',
    'Generate trending YouTube hashtags. Boost discoverability for any niche. Free AI generator, copy-paste ready.',
  ),

  '/hashtag-generator/youtube/education': o(
    'YouTube Education Hashtags That Boost Views (2026)',
    'Get the best education hashtags for YouTube. Tutorials, courses, and learning content. Free AI generator.',
  ),

  '/hashtag-generator/youtube/food': o(
    'Best Food Hashtags for YouTube (2026) — More Views Fast',
    'Generate food hashtags for YouTube. Recipes, mukbang, and food reviews that get discovered. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BIO GENERATOR — Platform Hubs
  // ═══════════════════════════════════════════════════════════════════

  '/bio-generator/tiktok': o(
    'TikTok Bio Generator (2026) — Get More Followers Fast',
    'Create the perfect TikTok bio with AI. 17 bio options per generation, optimized for 80 characters. Free, instant.',
  ),

  '/bio-generator/instagram': o(
    'Instagram Bio Generator (2026) — Get More Followers',
    'Generate the perfect Instagram bio with AI. 150-character optimized, 17 options per click. Free, instant.',
  ),

  '/bio-generator/youtube': o(
    'YouTube Bio Generator (2026) — Grow Your Channel Faster',
    'Create a perfect YouTube channel bio with AI. SEO-optimized descriptions that attract subscribers. Free, instant.',
  ),

  '/bio-generator/twitter': o(
    'X (Twitter) Bio Generator (2026) — Stand Out Fast',
    'Generate a perfect X/Twitter bio with AI. 160-character optimized, professional and creative options. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BIO GENERATOR — TikTok Roles (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/bio-generator/tiktok/artist': o(
    'TikTok Artist Bio Ideas (2026) — Stand Out Instantly',
    'Create a standout TikTok bio for artists. Copy-paste bio ideas that look creative, clear, and professional. Free AI tool.',
  ),

  '/bio-generator/tiktok/coach': o(
    'TikTok Bio for Coaches (2026) — Build Trust & Get Clients',
    'Generate a coaching bio for TikTok that builds authority. Professional, clear, and action-oriented. Free, instant.',
  ),

  '/bio-generator/tiktok/creator': o(
    'TikTok Creator Bio Ideas (2026) — Get More Followers Fast',
    'Create a TikTok creator bio that stands out. AI-generated, personality-packed, and optimized. Free tool.',
  ),

  '/bio-generator/tiktok/developer': o(
    'Developer Bio for TikTok (2026) — Get Noticed in Tech',
    'Generate a developer bio for TikTok. Showcase your skills, projects, and personality. Free AI tool, instant.',
  ),

  '/bio-generator/tiktok/entrepreneur': o(
    'TikTok Bio for Entrepreneurs (2026) — Build Your Brand Fast',
    'Create an entrepreneur bio for TikTok that attracts followers and opportunities. Free AI generator.',
  ),

  '/bio-generator/tiktok/freelancer': o(
    'Freelancer Bio for TikTok (2026) — Get Clients & Followers',
    'Generate a freelancer bio for TikTok. Showcase your services and personality. Free, instant, copy-paste ready.',
  ),

  '/bio-generator/tiktok/marketer': o(
    'TikTok Marketer Bio Ideas (2026) — Stand Out & Grow',
    'Create a marketer bio for TikTok that builds credibility. Growth-focused, professional. Free AI tool.',
  ),

  '/bio-generator/tiktok/student': o(
    'Student Bio for TikTok (2026) — Fun & Creative Ideas',
    'Generate a student bio for TikTok. Fun, creative, and campus-ready. Free AI tool, instant results.',
  ),

  '/bio-generator/tiktok/travel': o(
    'TikTok Travel Bio Ideas (2026) — Inspire Your Followers',
    'Create a travel bio for TikTok that captures wanderlust. Adventure-ready, with personality. Free, instant.',
  ),

  '/bio-generator/tiktok/writer': o(
    'Writer Bio for TikTok (2026) — Get More Followers Fast',
    'Generate a writer bio for TikTok. Showcase your voice, genre, and style. Free AI tool, copy-paste ready.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BIO GENERATOR — Instagram Roles (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/bio-generator/instagram/creator': o(
    'Instagram Creator Bio Ideas (2026) — Get More Followers',
    'Create a standout Instagram creator bio. AI-generated, personality-packed, and optimized for 150 characters. Free tool.',
  ),

  '/bio-generator/instagram/travel': o(
    'Instagram Travel Bio Ideas (2026) — Inspire & Grow',
    'Generate a travel bio for Instagram. Wanderlust vibes, location tags, and adventure personality. Free, instant.',
  ),

  '/bio-generator/instagram/writer': o(
    'Writer Bio for Instagram (2026) — Stand Out Instantly',
    'Create a writer bio for Instagram. Showcase your voice, publications, and style. Free AI tool.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BIO GENERATOR — YouTube Roles (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/bio-generator/youtube/artist': o(
    'YouTube Artist Bio Ideas (2026) — Grow Your Channel',
    'Create an artist bio for YouTube that attracts subscribers. Showcase your work and style. Free AI tool.',
  ),

  '/bio-generator/youtube/creator': o(
    'YouTube Creator Bio (2026) — Get More Subscribers Fast',
    'Generate a YouTube creator bio that stands out. SEO-optimized channel description. Free, instant.',
  ),

  '/bio-generator/youtube/food': o(
    'Food YouTuber Bio Ideas (2026) — Attract More Subscribers',
    'Create a food channel bio for YouTube. Recipes, reviews, and foodie personality. Free AI generator.',
  ),

  '/bio-generator/youtube/marketer': o(
    'YouTube Marketing Bio (2026) — Build Authority Fast',
    'Generate a marketing-focused YouTube bio. Establish expertise and attract your audience. Free, instant.',
  ),

  // ═══════════════════════════════════════════════════════════════════
  // BIO GENERATOR — X (Twitter) Roles (GSC impression pages)
  // ═══════════════════════════════════════════════════════════════════

  '/bio-generator/x/designer': o(
    'X Bio for Designers (2026) — Stand Out in Seconds',
    'Generate a designer bio for X. Graphic, UX, and creative professionals — showcase your craft. Free AI tool.',
  ),
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
