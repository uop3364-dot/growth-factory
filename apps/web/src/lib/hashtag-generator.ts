export interface HashtagRequest {
  platform: string;
  niche: string;
  purpose: string;
  keywords?: string[];
  language?: string;
}

export interface HashtagResult {
  hashtags: string[];
  trendingHashtags: string[];
  nicheHashtags: string[];
  hashtagSets: { name: string; tags: string[] }[];
  tip: string;
}

interface OpenAIHashtagResponse {
  hashtags: string[];
  trendingHashtags: string[];
  nicheHashtags: string[];
  hashtagSets: { name: string; tags: string[] }[];
  tip: string;
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
};

const PURPOSE_LABELS: Record<string, string> = {
  grow_followers: 'Grow Followers',
  boost_engagement: 'Boost Engagement',
  increase_reach: 'Increase Reach',
  brand_awareness: 'Brand Awareness',
  community_building: 'Community Building',
  viral_content: 'Viral Content',
};

// ---------------------------------------------------------------------------
// Hashtag database by niche – realistic tags with a mix of volume tiers
// ---------------------------------------------------------------------------

const NICHE_HASHTAGS: Record<string, { popular: string[]; trending: string[]; niche: string[] }> = {
  travel: {
    popular: ['#travel', '#wanderlust', '#travelgram', '#instatravel', '#traveling', '#travelphotography', '#traveltheworld', '#explore', '#vacation', '#adventure', '#travelblogger', '#traveladdict', '#tourism', '#trip', '#holiday'],
    trending: ['#travelreels', '#traveltok', '#bucketlist2026', '#solotravel', '#digitalnomadlife', '#slowtravel', '#sustainabletravel', '#vanlife', '#roadtripvibes', '#hiddengems'],
    niche: ['#backpackerlife', '#digitalnomad', '#sustainabletravel', '#offthebeatenpath', '#worldnomads', '#travelcouple', '#femaletravel', '#budgettravel', '#luxurytravel', '#culturaltravel'],
  },
  food: {
    popular: ['#food', '#foodie', '#foodporn', '#instafood', '#yummy', '#foodphotography', '#delicious', '#foodstagram', '#homemade', '#cooking', '#foodlover', '#foodblogger', '#recipe', '#dinner', '#lunch'],
    trending: ['#foodtok', '#foodreels', '#whatieatinaday', '#mealprep2026', '#airfryerrecipes', '#proteinmeals', '#veganfood', '#foodhacks', '#cookingtiktok', '#comfortfood'],
    niche: ['#farmtotable', '#sourdoughbaking', '#mealprepping', '#plantbased', '#glutenfreeliving', '#streetfoodlover', '#homecook', '#seasonalcooking', '#fermentation', '#foodstyling'],
  },
  fitness: {
    popular: ['#fitness', '#gym', '#workout', '#fitnessmotivation', '#fit', '#training', '#health', '#bodybuilding', '#fitfam', '#exercise', '#lifestyle', '#muscle', '#strong', '#motivation', '#personaltrainer'],
    trending: ['#fitnesstok', '#gymreels', '#homeworkout', '#strengthtraining', '#hybridathlete', '#rucking', '#75hard', '#zonediet', '#fitnessjourney2026', '#cozycardiofitness'],
    niche: ['#calisthenics', '#powerlifting', '#crossfitcommunity', '#yogaeveryday', '#runningcommunity', '#pilateslife', '#kettlebellworkout', '#mobilitywork', '#functionalfitness', '#mindfulmovement'],
  },
  beauty: {
    popular: ['#beauty', '#makeup', '#skincare', '#beautyblogger', '#cosmetics', '#makeupartist', '#beautytips', '#skincareroutine', '#glam', '#mua', '#beautyproducts', '#lipstick', '#foundation', '#eyeshadow', '#selfcare'],
    trending: ['#beautytok', '#grwm', '#skintok', '#cleanbeauty', '#glasskin', '#makeuptrends2026', '#skincycling', '#sunscreeneveryday', '#slugging', '#dewyskin'],
    niche: ['#koreanbeauty', '#crueltyfreebeauty', '#naturalskincare', '#maturebeauty', '#minimalistmakeup', '#texturepositive', '#skinbarrierrepair', '#retinoljourney', '#beautyover40', '#fragrancefree'],
  },
  business: {
    popular: ['#business', '#entrepreneur', '#startup', '#smallbusiness', '#motivation', '#success', '#entrepreneurship', '#marketing', '#businessowner', '#hustle', '#money', '#leadership', '#goals', '#mindset', '#growth'],
    trending: ['#businesstok', '#sidehustle2026', '#passiveincome', '#aitools', '#remotework', '#buildyourbrand', '#personalbranding', '#creatoreconomy', '#solopreneur', '#saas'],
    niche: ['#bootstrapped', '#womaninbusiness', '#ecommercetips', '#shopifystore', '#businesscoach', '#startuplife', '#d2cbrand', '#microentrepreneur', '#businessmindset', '#scaleyourbiz'],
  },
  marketing: {
    popular: ['#marketing', '#digitalmarketing', '#socialmediamarketing', '#contentmarketing', '#branding', '#seo', '#marketingtips', '#marketingstrategy', '#onlinemarketing', '#emailmarketing', '#socialmedia', '#advertising', '#growth', '#brand', '#analytics'],
    trending: ['#marketingtok', '#aimarketing', '#ugccreator', '#reelsmarketing', '#tiktokads', '#contentcreator2026', '#conversationalmarketing', '#shortformvideo', '#performancemarketing', '#communityled'],
    niche: ['#growthmarketing', '#conversionoptimization', '#copywritingtips', '#funnelstrategy', '#affiliatemarketing', '#influencermarketing', '#emailautomation', '#seoexpert', '#b2bmarketing', '#neuromarketing'],
  },
  technology: {
    popular: ['#technology', '#tech', '#innovation', '#programming', '#coding', '#developer', '#software', '#ai', '#machinelearning', '#python', '#webdevelopment', '#data', '#cybersecurity', '#cloud', '#iot'],
    trending: ['#techtok', '#aiart', '#chatgpt', '#generativeai', '#web3', '#openai', '#llm', '#techreels', '#promptengineering', '#buildwithAI'],
    niche: ['#fullstackdev', '#reactjs', '#devops', '#techstartup', '#cloudnative', '#opensourcesoftware', '#rustlang', '#datascience', '#mlops', '#quantumcomputing'],
  },
  gaming: {
    popular: ['#gaming', '#gamer', '#videogames', '#ps5', '#xbox', '#twitch', '#pcgaming', '#gamingcommunity', '#esports', '#nintendo', '#gameplay', '#streamer', '#fortnite', '#gaminglife', '#games'],
    trending: ['#gamingtok', '#gamingclips', '#indiegames', '#cozygaming', '#retrogaming', '#gamingsetup2026', '#steamdeck', '#baldursgate3', '#gamingmemes', '#vr'],
    niche: ['#speedrun', '#gamedev', '#pixelart', '#tabletopgaming', '#roguelike', '#mmorpg', '#gamingaccessibility', '#nintendoswitch', '#fightinggames', '#gamecollecting'],
  },
  pets: {
    popular: ['#pets', '#dogs', '#cats', '#dogsofinstagram', '#catsofinstagram', '#puppy', '#kitten', '#petsofinstagram', '#doglover', '#catlover', '#petlife', '#cute', '#animals', '#furbaby', '#doglife'],
    trending: ['#pettok', '#petreels', '#dogmom', '#catdad', '#adoptdontshop', '#rescuedog', '#petparent', '#doodlesofinstagram', '#bengalcat', '#goldenretriever'],
    niche: ['#rawfeddogs', '#cattraining', '#seniorpets', '#servicedog', '#reactivedog', '#petphotography', '#exoticpets', '#birdtok', '#aquascaping', '#petnutrition'],
  },
  fashion: {
    popular: ['#fashion', '#style', '#ootd', '#fashionblogger', '#instafashion', '#outfit', '#fashionista', '#streetstyle', '#shopping', '#fashionstyle', '#trendy', '#love', '#model', '#lookoftheday', '#whatiwore'],
    trending: ['#fashiontok', '#fashionreels', '#thriftflip', '#capsulewardrobe', '#quietluxury', '#oldmoney', '#streetwear2026', '#sustainablefashion', '#dopaminedressing', '#coastalgrandmother'],
    niche: ['#slowfashion', '#vintagestyle', '#plussizefashion', '#menswear', '#ethicalfashion', '#minimaliststyle', '#secondhandfashion', '#cottagecore', '#darkacademia', '#y2kfashion'],
  },
  photography: {
    popular: ['#photography', '#photooftheday', '#photo', '#photographer', '#nature', '#art', '#landscape', '#portrait', '#travel', '#picoftheday', '#canonphotography', '#sonyalpha', '#streetphotography', '#sunset', '#naturephotography'],
    trending: ['#phototok', '#photographyreels', '#dronephotography', '#filmisnotdead', '#35mm', '#lightroompresets', '#astrophotography', '#iphone15photography', '#aiphotography', '#goldenhour'],
    niche: ['#documentaryphotography', '#fineart', '#minimalphoto', '#blackandwhitephotography', '#filmphotography', '#wildlifephotographer', '#compositephotography', '#photojournalism', '#nightphotography', '#macrophotography'],
  },
  music: {
    popular: ['#music', '#musician', '#singer', '#song', '#dj', '#hiphop', '#rap', '#rock', '#pop', '#livemusic', '#guitar', '#producer', '#beats', '#newmusic', '#musicproducer'],
    trending: ['#musictok', '#musicreels', '#newrelease2026', '#indiemusic', '#bedroompop', '#lofi', '#spotifyplaylist', '#musiccover', '#singersongwriter', '#viralsound'],
    niche: ['#homestudio', '#synthwave', '#jazzmusic', '#classicalmusician', '#folkmusic', '#undergroundhiphop', '#musictheory', '#vinylcollection', '#modularsynth', '#acapella'],
  },
  lifestyle: {
    popular: ['#lifestyle', '#life', '#love', '#happy', '#instagood', '#photooftheday', '#beautiful', '#inspiration', '#like', '#follow', '#selfcare', '#wellness', '#mindfulness', '#positivevibes', '#dailylife'],
    trending: ['#lifestyletok', '#lifestylereels', '#morningroutine', '#thatgirl', '#romanticizeyourlife', '#softlife', '#dayinmylife', '#aestheticlifestyle', '#wellnessjourney', '#intentionalliving'],
    niche: ['#minimalistliving', '#countryliving', '#cityliving', '#homesteading', '#journaling', '#zerowaste', '#digitalminimalism', '#slowliving', '#hyggelife', '#vanlifediaries'],
  },
  education: {
    popular: ['#education', '#learning', '#study', '#school', '#teacher', '#student', '#knowledge', '#college', '#university', '#teaching', '#onlinelearning', '#studygram', '#studymotivation', '#edtech', '#stem'],
    trending: ['#edutok', '#learnontiktok', '#studytok', '#microlearning', '#aieducation', '#onlinecourse', '#learnwithme', '#studywithme', '#skillbuilding', '#lifetimelearner'],
    niche: ['#homeschoolmom', '#teacherlife', '#elearning', '#languagelearning', '#codingbootcamp', '#gradschool', '#scienceeducation', '#montessori', '#unschooling', '#educationtechnology'],
  },
  art: {
    popular: ['#art', '#artist', '#artwork', '#drawing', '#painting', '#illustration', '#sketch', '#creative', '#design', '#artistsoninstagram', '#digitalart', '#instaart', '#contemporaryart', '#fineart', '#watercolor'],
    trending: ['#arttok', '#artreels', '#procreate', '#aiart', '#processprogress', '#artchallenge', '#sketchbook2026', '#characterdesign', '#3dart', '#arttherapy'],
    niche: ['#oilpainting', '#acrylicpouring', '#linocut', '#ceramicart', '#textileart', '#abstractart', '#calligraphy', '#pleinairpainting', '#mixedmedia', '#artcollector'],
  },
};

// Platform-specific popular tags
const PLATFORM_TAGS: Record<string, string[]> = {
  instagram: ['#instagood', '#photooftheday', '#instadaily', '#reels', '#instareels', '#explore', '#viral', '#trending', '#fyp', '#igers'],
  tiktok: ['#fyp', '#foryou', '#foryoupage', '#viral', '#tiktok', '#trending', '#xyzbca', '#trend', '#viralvideo', '#fypシ'],
  youtube: ['#youtube', '#youtuber', '#youtubechannel', '#subscribe', '#video', '#youtubevideos', '#vlog', '#shorts', '#youtubeshorts', '#creator'],
  x: ['#trending', '#viral', '#thread', '#mustread', '#breakingnews', '#hottake', '#discussion', '#opinion', '#debate', '#news'],
  linkedin: ['#leadership', '#professionaldevelopment', '#networking', '#careergrowth', '#innovation', '#thoughtleadership', '#hiring', '#opentowork', '#linkedintips', '#personalbrand'],
};

// Purpose-specific tags
const PURPOSE_TAGS: Record<string, string[]> = {
  grow_followers: ['#followme', '#follow', '#followforfollowback', '#followers', '#followback', '#newpost', '#discovermore', '#growwithme', '#supportsmallcreators', '#contentcreator'],
  boost_engagement: ['#engagement', '#commentbelow', '#lmk', '#thoughts', '#community', '#connect', '#sharewiththem', '#relatable', '#savethis', '#doubletap'],
  increase_reach: ['#viral', '#explore', '#trending', '#discover', '#sharethis', '#repost', '#spreadtheword', '#explorepage', '#algorithm', '#visibility'],
  brand_awareness: ['#brand', '#branding', '#brandidentity', '#brandstory', '#knowyourbrand', '#brandbuilding', '#trustedby', '#valuedriven', '#missiondriven', '#authenticbrand'],
  community_building: ['#community', '#tribe', '#together', '#supporteachother', '#buildtogether', '#likeminded', '#communityfirst', '#belonging', '#growcommunity', '#yourpeople'],
  viral_content: ['#viral', '#goviral', '#viralpost', '#viralcontent', '#trending', '#blowup', '#sharethis', '#mustsee', '#cantmissthis', '#watchthis'],
};

// Tips by platform
const PLATFORM_TIPS: Record<string, string[]> = {
  instagram: [
    'Instagram allows up to 30 hashtags per post. Use a mix of 10 popular (1M+), 10 medium (100K-1M), and 10 niche (<100K) hashtags for best reach.',
    'Place hashtags in your first comment rather than the caption to keep your post looking clean while still getting discovered.',
    'Rotate your hashtag sets every few posts to avoid being flagged as spam by the Instagram algorithm.',
    'Use Instagram\'s search to check hashtag volume before posting. Avoid banned or restricted hashtags that can shadowban your account.',
    'Reels hashtags work differently: use fewer (5-15) but more specific hashtags for better Reels discoverability.',
  ],
  tiktok: [
    'TikTok hashtags help the algorithm categorize your content. Use 3-5 highly relevant hashtags rather than stuffing 30 generic ones.',
    'Combine trending hashtags (#fyp, #foryou) with niche-specific ones to reach both broad and targeted audiences.',
    'Check TikTok\'s Discover page daily to find trending hashtags in your niche and ride the wave early.',
    'Create or participate in hashtag challenges to boost engagement and get featured on the For You page.',
    'TikTok\'s algorithm weighs watch time more than hashtags, so focus on creating engaging content first, hashtags second.',
  ],
  youtube: [
    'YouTube uses hashtags differently: only the first 3 hashtags in your description appear above your video title.',
    'Use hashtags in your YouTube Shorts to get discovered in the Shorts feed. Keep them relevant and specific.',
    'Don\'t overdo YouTube hashtags. More than 15 hashtags can cause YouTube to ignore all of them.',
    'Research trending YouTube hashtags using YouTube\'s search autocomplete and trending tab for your category.',
    'Combine branded hashtags with topic hashtags to build a searchable content library on your channel.',
  ],
  x: [
    'X (Twitter) posts with 1-2 hashtags get 21% more engagement than those with 3+. Keep it focused.',
    'Use hashtags that are currently trending on X to join conversations and increase visibility in real-time.',
    'Create a branded hashtag for your content series to build a searchable archive and community identity.',
    'Avoid using hashtags that are too broad on X. #marketing has millions of tweets; #contentmarketingtips is more discoverable.',
    'Place hashtags naturally within your tweet text rather than dumping them at the end for better readability.',
  ],
  linkedin: [
    'LinkedIn recommends 3-5 hashtags per post. Using more can look unprofessional and reduce engagement.',
    'Follow popular LinkedIn hashtags in your industry to stay updated and get your content shown to followers of those tags.',
    'Mix broad industry hashtags (#marketing) with specific ones (#b2bsaasmarketing) to reach the right professional audience.',
    'LinkedIn hashtags are clickable and searchable. Use them to position your content in professional conversations.',
    'Create a signature hashtag for your LinkedIn content series to build thought leadership and make your posts easily findable.',
  ],
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickItems<T>(arr: T[], seed: number, count: number): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count && i < arr.length; i++) {
    let idx = (seed + i * 7) % arr.length;
    while (used.has(idx)) idx = (idx + 1) % arr.length;
    used.add(idx);
    result.push(arr[idx]);
  }
  return result;
}

export function generateHashtags(req: HashtagRequest): HashtagResult {
  const seed = hashCode(`${req.platform}-${req.niche}-${req.purpose}`);
  const nicheData = NICHE_HASHTAGS[req.niche] || NICHE_HASHTAGS['lifestyle'];
  const platformTags = PLATFORM_TAGS[req.platform] || PLATFORM_TAGS['instagram'];
  const purposeTags = PURPOSE_TAGS[req.purpose] || PURPOSE_TAGS['grow_followers'];
  const tips = PLATFORM_TIPS[req.platform] || PLATFORM_TIPS['instagram'];

  // Build the main 30 hashtags: mix of popular, trending, niche, platform, purpose
  const popularPick = pickItems(nicheData.popular, seed, 8);
  const trendingPick = pickItems(nicheData.trending, seed + 1, 6);
  const nichePick = pickItems(nicheData.niche, seed + 2, 6);
  const platformPick = pickItems(platformTags, seed + 3, 5);
  const purposePick = pickItems(purposeTags, seed + 4, 5);

  // Add keyword-based hashtags
  const keywordTags: string[] = [];
  if (req.keywords?.length) {
    for (const kw of req.keywords.slice(0, 4)) {
      const normalized = kw.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      if (normalized) {
        keywordTags.push(`#${normalized}`);
      }
    }
  }

  const allHashtags = [...new Set([...popularPick, ...trendingPick, ...nichePick, ...platformPick, ...purposePick, ...keywordTags])];
  const hashtags = allHashtags.slice(0, 30);

  // Trending hashtags: niche trending + platform trending
  const trendingHashtags = [...new Set([
    ...pickItems(nicheData.trending, seed + 5, 6),
    ...pickItems(platformTags, seed + 6, 4),
  ])].slice(0, 10);

  // Niche-specific hashtags
  const nicheHashtags = [...new Set([
    ...pickItems(nicheData.niche, seed + 7, 7),
    ...pickItems(nicheData.popular, seed + 8, 3),
  ])].slice(0, 10);

  // Build 3 hashtag sets
  const nicheLabel = req.niche.charAt(0).toUpperCase() + req.niche.slice(1);
  const platformLabel = PLATFORM_LABELS[req.platform] || req.platform;

  const hashtagSets = [
    {
      name: `${nicheLabel} Growth Mix`,
      tags: [...new Set([
        ...pickItems(nicheData.popular, seed + 10, 4),
        ...pickItems(nicheData.trending, seed + 11, 3),
        ...pickItems(purposeTags, seed + 12, 3),
      ])].slice(0, 10),
    },
    {
      name: `${platformLabel} Discovery`,
      tags: [...new Set([
        ...pickItems(platformTags, seed + 13, 4),
        ...pickItems(nicheData.trending, seed + 14, 3),
        ...pickItems(nicheData.niche, seed + 15, 3),
      ])].slice(0, 10),
    },
    {
      name: `Niche Authority`,
      tags: [...new Set([
        ...pickItems(nicheData.niche, seed + 16, 5),
        ...pickItems(nicheData.popular, seed + 17, 3),
        ...pickItems(nicheData.trending, seed + 18, 2),
      ])].slice(0, 10),
    },
  ];

  const tip = pickItems(tips, seed + 20, 1)[0];

  return { hashtags, trendingHashtags, nicheHashtags, hashtagSets, tip };
}

async function generateWithOpenAI(req: HashtagRequest): Promise<HashtagResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const platformLabel = PLATFORM_LABELS[req.platform] || req.platform;
  const purposeLabel = PURPOSE_LABELS[req.purpose] || req.purpose;
  const nicheLabel = req.niche.charAt(0).toUpperCase() + req.niche.slice(1);

  const prompt = [
    'You are a social media hashtag research expert.',
    `Generate hashtags for platform: ${platformLabel}.`,
    `Niche: ${nicheLabel}. Purpose: ${purposeLabel}.`,
    `Language: ${req.language || 'english'}.`,
    `Keywords: ${req.keywords?.join(', ') || 'none'}.`,
    'Return strict JSON with keys:',
    '- hashtags: 30 hashtags (mix of high-volume 1M+, medium 100K-1M, and low-competition <100K)',
    '- trendingHashtags: 10 currently trending hashtags for this niche',
    '- nicheHashtags: 10 niche-specific low-competition hashtags',
    '- hashtagSets: 3 objects each with {name: string, tags: string[]} where tags has 10 hashtags',
    '- tip: 1 actionable hashtag strategy tip for this platform',
    'All hashtags must start with #. No markdown, no extra text.',
  ].join('\n');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'You output valid JSON only.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return null;

    const parsed = JSON.parse(text) as OpenAIHashtagResponse;
    if (!Array.isArray(parsed.hashtags) || !Array.isArray(parsed.trendingHashtags) || !Array.isArray(parsed.nicheHashtags) || !Array.isArray(parsed.hashtagSets) || typeof parsed.tip !== 'string') {
      return null;
    }

    return {
      hashtags: parsed.hashtags.slice(0, 30),
      trendingHashtags: parsed.trendingHashtags.slice(0, 10),
      nicheHashtags: parsed.nicheHashtags.slice(0, 10),
      hashtagSets: parsed.hashtagSets.slice(0, 3).map(s => ({ name: s.name, tags: (s.tags || []).slice(0, 10) })),
      tip: parsed.tip,
    };
  } catch {
    return null;
  }
}

export async function generateHashtagsWithProvider(req: HashtagRequest): Promise<HashtagResult | null> {
  const llmResult = await generateWithOpenAI(req);
  if (llmResult) return llmResult;

  const { isFakeFallbackAllowed } = await import('./llm-shared');
  if (isFakeFallbackAllowed()) {
    return generateHashtags(req);
  }

  return null;
}
