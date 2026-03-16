/**
 * Content differentiation config for caption-generator programmatic pages.
 * Each layer (platform / topic / tone) has unique copy to reduce template duplication.
 */

import type { Platform, Topic, Tone } from './seo-data';

// ─── Platform-specific content ───────────────────────────────────────────────

export interface PlatformContent {
  styleGuide: string;
  lengthTip: string;
  ctaStyle: string;
  hashtagTip: string;
  emojiUsage: string;
  bestFor: string[];
}

export const PLATFORM_CONTENT: Record<Platform, PlatformContent> = {
  instagram: {
    styleGuide: 'Instagram captions thrive on storytelling and emotional hooks. Start with a bold first line — it\'s the only text visible before "more." Mix personal anecdotes with value-driven content to drive saves and shares.',
    lengthTip: 'Optimal length is 138–150 characters for feed posts. Carousel posts can use longer captions (up to 2,200 chars) because users are already engaged.',
    ctaStyle: 'Use soft CTAs like "Save this for later," "Double tap if you agree," or direct questions. Instagram\'s algorithm rewards comments, so ask open-ended questions.',
    hashtagTip: 'Use 3–5 highly relevant hashtags mixed into the caption or at the end. Avoid banned hashtags. Niche hashtags (10K–500K posts) outperform generic ones.',
    emojiUsage: 'Emojis boost engagement by ~15%. Use them as bullet points, line breaks, or emotional accents — but keep it under 4 per caption for a clean look.',
    bestFor: ['Visual storytelling', 'Brand building', 'Community engagement', 'Product showcases', 'Behind-the-scenes content'],
  },
  tiktok: {
    styleGuide: 'TikTok captions are short and punchy — they compete with fast-scrolling behavior. Use curiosity gaps ("Wait for the end…") and trending phrases to stop the scroll.',
    lengthTip: 'Keep captions under 80 characters. TikTok truncates at ~55 visible characters on mobile. Front-load the hook.',
    ctaStyle: 'Use action-oriented CTAs: "Follow for Part 2," "Stitch this with your take," "Duet if you relate." TikTok rewards content that sparks interaction.',
    hashtagTip: 'Use 2–4 hashtags max. Combine one trending hashtag with niche-specific ones. #FYP and #ForYou still work for discoverability but add at least one topical tag.',
    emojiUsage: 'Minimal emoji use — TikTok\'s audience skews toward raw, authentic text. One or two emojis max. Let the video do the visual work.',
    bestFor: ['Trending content', 'Educational short-form', 'Entertainment clips', 'Product demos', 'Day-in-the-life content'],
  },
  youtube: {
    styleGuide: 'YouTube descriptions serve double duty: viewer context and SEO. The first 2–3 lines appear above the fold, so put your hook and value proposition there.',
    lengthTip: 'First 160 characters show in search results. Full descriptions of 200–300 words rank better. Include timestamps and links below the fold.',
    ctaStyle: 'Direct CTAs work best: "Subscribe and hit the bell," "Comment your answer below," "Watch next: [link]." YouTube rewards watch time, so drive to your next video.',
    hashtagTip: 'Place 3–5 hashtags in the description (not title). The first 3 appear above the video title on desktop. Use exact-match search terms.',
    emojiUsage: 'Use emojis sparingly in titles and descriptions for visual separation. Arrow emojis (➡️) and checkmarks (✅) work well for lists and CTAs.',
    bestFor: ['Long-form tutorials', 'Product reviews', 'Vlogs', 'How-to guides', 'Interview content'],
  },
  x: {
    styleGuide: 'X (Twitter) rewards sharp, opinionated writing. Lead with your strongest take. Threads perform well for in-depth content — use the first tweet as a hook.',
    lengthTip: 'Sweet spot is 71–100 characters for maximum engagement. Tweets under 280 chars that leave room for quoted retweets perform best.',
    ctaStyle: 'Use implied CTAs: "Retweet if you agree," "What would you add?" or just end with a provocative statement that begs a reply. Polls boost engagement 2–3x.',
    hashtagTip: 'Use 1–2 hashtags maximum. More than that reduces engagement on X. Place them naturally within the sentence, not as a hashtag wall.',
    emojiUsage: 'Use sparingly for emphasis or as bullet points in threads. X users prefer text-forward content. One well-placed emoji beats five random ones.',
    bestFor: ['Hot takes', 'Industry commentary', 'News reactions', 'Threads', 'Quick tips'],
  },
  facebook: {
    styleGuide: 'Facebook favors conversational, community-driven content. Posts that ask questions or share relatable stories get more comments and shares, which the algorithm amplifies.',
    lengthTip: 'Ideal length is 40–80 characters for link posts, up to 250 characters for text posts. Longer posts (400+ chars) work for storytelling in groups.',
    ctaStyle: 'Community-focused CTAs: "Share with someone who needs this," "Tag a friend," "Drop your answer below." Facebook groups especially reward discussion prompts.',
    hashtagTip: 'Use 1–3 hashtags. Facebook hashtags are less impactful than other platforms, but they help with discoverability in search. Keep them broad.',
    emojiUsage: 'Moderate emoji use. Facebook\'s audience skews older, so keep emojis warm and readable (❤️, 👏, ✨). Avoid trendy Gen-Z emoji combos.',
    bestFor: ['Community building', 'Event promotion', 'Group discussions', 'Local business content', 'Shareable stories'],
  },
};

// ─── Topic-specific content ──────────────────────────────────────────────────

export interface TopicContent {
  captionAngle: string;
  exampleHooks: string[];
  ctaTypes: string[];
  contentTips: string;
}

export const TOPIC_CONTENT: Record<Topic, TopicContent> = {
  travel: {
    captionAngle: 'Travel captions work best when they transport the reader. Use sensory language — what you saw, smelled, tasted. Pair wanderlust with practical tips for saves.',
    exampleHooks: ['The moment I stepped off the plane…', 'This hidden gem changed my entire trip', 'Budget travel hack that saved me $500'],
    ctaTypes: ['Ask: "Where should I go next?"', 'Save prompt: "Save for your next trip"', 'Tag: "Tag your travel buddy"'],
    contentTips: 'Combine destination-specific details with universal travel emotions. Geo-tagging and location-specific hashtags dramatically boost reach.',
  },
  food: {
    captionAngle: 'Food captions should make mouths water. Describe flavors, textures, and the experience — not just the dish name. Recipe snippets in captions drive saves.',
    exampleHooks: ['This 5-minute recipe changed everything', 'The secret ingredient nobody talks about', 'I recreated this restaurant dish at home'],
    ctaTypes: ['Save prompt: "Save this recipe"', 'Question: "What\'s your comfort food?"', 'Challenge: "Try this and share your result"'],
    contentTips: 'Close-up shots with descriptive captions outperform wide shots. Mention dietary info (vegan, gluten-free) for niche reach.',
  },
  fitness: {
    captionAngle: 'Fitness captions that show vulnerability and real progress outperform "perfect body" content. Share the struggle, the routine, and the mindset shift.',
    exampleHooks: ['Day 1 vs Day 90 — here\'s what actually changed', 'The exercise I avoided for years (and why I was wrong)', 'My honest review after 30 days of…'],
    ctaTypes: ['Challenge: "Try this workout and tag me"', 'Save: "Save for your next gym session"', 'Question: "What\'s your PR this week?"'],
    contentTips: 'Transformation content and workout breakdowns get the most saves. Time-specific content ("morning routine") performs well in search.',
  },
  beauty: {
    captionAngle: 'Beauty captions that educate outperform those that just showcase. Explain the "why" behind product choices, techniques, and routines.',
    exampleHooks: ['The skincare mistake 90% of people make', 'This $8 product replaced my entire routine', 'Dermatologist-approved routine for…'],
    ctaTypes: ['Question: "What\'s your holy grail product?"', 'Save: "Save this routine"', 'Share: "Send to someone who needs this"'],
    contentTips: 'Before/after content and ingredient breakdowns drive engagement. Seasonal content (summer skincare, winter routine) has natural search demand.',
  },
  business: {
    captionAngle: 'Business captions work when they distill complex lessons into actionable insights. Share real numbers, real failures, and contrarian takes.',
    exampleHooks: ['The mistake that cost me $10K (and what I learned)', 'I built this in 30 days with $0 budget', '3 things I\'d tell my day-one self'],
    ctaTypes: ['Engage: "What\'s your biggest business challenge?"', 'Save: "Bookmark this strategy"', 'Share: "Tag an entrepreneur who needs this"'],
    contentTips: 'Data-driven posts and personal stories outperform generic motivational content. LinkedIn-style storytelling works across platforms.',
  },
  marketing: {
    captionAngle: 'Marketing captions should practice what they preach — use proven hooks, clear value props, and strong CTAs. Meta-commentary on marketing trends performs well.',
    exampleHooks: ['This ad framework generated 5x ROAS', 'The marketing trend everyone\'s ignoring', 'I analyzed 100 viral posts — here\'s the pattern'],
    ctaTypes: ['Save: "Save this framework"', 'Comment: "Drop your niche and I\'ll give a tip"', 'Follow: "Follow for more marketing breakdowns"'],
    contentTips: 'Case studies and data-backed insights earn the most credibility. Use screenshot proof and real metrics whenever possible.',
  },
  gaming: {
    captionAngle: 'Gaming captions thrive on hype, humor, and community references. Use in-game terminology and celebrate clutch moments — authenticity matters more than polish.',
    exampleHooks: ['The clutch play that won us the match', 'Rating this game after 100 hours', 'The loadout nobody is talking about'],
    ctaTypes: ['Question: "What\'s your main?"', 'Challenge: "Beat my score and I\'ll follow you"', 'Engage: "Hot take: comment your ranking"'],
    contentTips: 'Clip highlights with reaction commentary outperform plain gameplay. Use game-specific hashtags for discoverability in niche communities.',
  },
  pets: {
    captionAngle: 'Pet captions work best with personality — give your pet a "voice" or share the humor of pet parenthood. Relatable pet moments are endlessly shareable.',
    exampleHooks: ['When they give you THAT look', 'Things my pet does that make zero sense', 'The vet said something I wasn\'t expecting'],
    ctaTypes: ['Share: "Tag a fellow pet parent"', 'Question: "Does your pet do this too?"', 'Vote: "Rate my pet 1–10"'],
    contentTips: 'Humor and cute moments dominate pet content. Breed-specific and seasonal pet content (holiday outfits, summer safety) captures search intent.',
  },
  fashion: {
    captionAngle: 'Fashion captions that explain the "why" behind outfit choices outperform simple OOTD posts. Style tips, occasion-based outfits, and budget breakdowns drive saves.',
    exampleHooks: ['This outfit cost under $50 total', '5 ways to style one piece', 'The fashion rule I stopped following'],
    ctaTypes: ['Vote: "Which outfit — 1 or 2?"', 'Save: "Save for outfit inspo"', 'Shop: "Everything linked in bio"'],
    contentTips: 'Outfit formula content ("X + Y + Z = perfect look") performs well in search. Seasonal trend roundups capture high-volume queries.',
  },
  motivation: {
    captionAngle: 'Motivational captions that share specific, personal turning points hit harder than generic quotes. Combine inspiration with actionable next steps.',
    exampleHooks: ['The day I almost gave up (and why I didn\'t)', 'Read this if you\'re doubting yourself', 'The 5am habit that changed my year'],
    ctaTypes: ['Share: "Send this to someone who needs it"', 'Engage: "Comment your goal for this month"', 'Save: "Save for a bad day"'],
    contentTips: 'Story-driven motivation outperforms quote graphics. Tie motivation to specific, relatable life situations for maximum impact.',
  },
  technology: {
    captionAngle: 'Tech captions that simplify complex topics and reveal hidden features get the most engagement. Be the friend who explains tech in plain language.',
    exampleHooks: ['This hidden feature saves me hours every week', 'The app nobody talks about', 'I tested every AI tool so you don\'t have to'],
    ctaTypes: ['Save: "Save for when you need this"', 'Question: "What tech tool can\'t you live without?"', 'Share: "Share with someone who needs this tip"'],
    contentTips: 'Comparison content and "X vs Y" posts drive strong engagement. Quick-tip format with screen recordings works across platforms.',
  },
  education: {
    captionAngle: 'Educational captions should lead with a surprising fact or counterintuitive insight. Break complex topics into digestible, numbered points.',
    exampleHooks: ['Everything you were taught about this is wrong', '5 things I wish I learned in school', 'This free resource is better than a $2,000 course'],
    ctaTypes: ['Save: "Save this for later study"', 'Share: "Share with a student who needs this"', 'Comment: "What topic should I explain next?"'],
    contentTips: 'Listicle-style educational content and "myth vs fact" formats perform consistently. Time-sensitive content (exam season, back to school) captures seasonal demand.',
  },
  photography: {
    captionAngle: 'Photography captions that reveal the story behind the shot — settings, location, creative process — turn casual viewers into engaged followers.',
    exampleHooks: ['The editing trick that transformed this photo', 'I waited 3 hours for this shot', 'Camera settings: behind the scenes of this capture'],
    ctaTypes: ['Question: "What would you shoot here?"', 'Challenge: "Try this technique and tag me"', 'Save: "Save this editing tip"'],
    contentTips: 'Behind-the-scenes and before/after editing content drives the highest engagement. Gear reviews with sample shots serve evergreen search intent.',
  },
  music: {
    captionAngle: 'Music captions should capture the emotion and story behind the sound. Share creative process insights, inspiration sources, and the feeling you want listeners to experience.',
    exampleHooks: ['The story behind this song', 'I wrote this in one sitting at 3am', 'This chord progression changes everything'],
    ctaTypes: ['Listen: "Link in bio — tell me what you think"', 'Engage: "What song has been on repeat for you?"', 'Share: "Share with someone who needs this vibe"'],
    contentTips: 'Process videos (writing, recording, mixing) and emotional storytelling outperform simple "new track" posts. Trending audio + original content is a powerful combo.',
  },
  lifestyle: {
    captionAngle: 'Lifestyle captions that blend aspiration with relatability hit the sweet spot. Show the curated version, but acknowledge the real — audiences reward authenticity.',
    exampleHooks: ['My morning routine (honest version)', 'Small changes that upgraded my daily life', 'The weekend reset that actually works'],
    ctaTypes: ['Question: "What does your ideal morning look like?"', 'Save: "Save this for Sunday planning"', 'Share: "Tag someone who inspires your lifestyle"'],
    contentTips: 'Routine content and "day in my life" formats have evergreen search demand. Seasonal lifestyle content (spring cleaning, holiday prep) captures timely traffic.',
  },
};

// ─── Tone-specific content ───────────────────────────────────────────────────

export interface ToneContent {
  definition: string;
  bestFor: string[];
  notBestFor: string[];
  beforeAfter: { before: string; after: string };
  writingTips: string[];
}

export const TONE_CONTENT: Record<Tone, ToneContent> = {
  funny: {
    definition: 'Funny captions use humor, self-deprecation, and cultural references to entertain. They make your audience laugh, save, and share — humor is the most viral emotion on social media.',
    bestFor: ['Relatable everyday moments', 'Behind-the-scenes bloopers', 'Trending meme formats', 'Self-aware brand content'],
    notBestFor: ['Sensitive topics', 'Formal announcements', 'Crisis communication', 'Legal or medical content'],
    beforeAfter: {
      before: 'Just arrived at the beach for vacation.',
      after: 'My out-of-office reply is on and my phone is about to have a swimming accident.',
    },
    writingTips: ['Use unexpected twists in the last line', 'Self-deprecating humor feels authentic', 'Reference shared experiences everyone recognizes', 'Keep it light — if you have to explain the joke, rewrite it'],
  },
  cute: {
    definition: 'Cute captions create warm, feel-good moments that make your audience smile. They\'re heartfelt without being cheesy, sweet without being saccharine — perfect for building emotional connection.',
    bestFor: ['Pet content', 'Family moments', 'Relationship milestones', 'Wholesome brand storytelling'],
    notBestFor: ['Hard-selling products', 'Controversial takes', 'Technical tutorials', 'B2B marketing'],
    beforeAfter: {
      before: 'My dog is sitting next to me.',
      after: 'Someone told me dogs can\'t love you back. Clearly they\'ve never met this one.',
    },
    writingTips: ['Use sensory details that evoke warmth', 'Short sentences build emotional impact', 'Focus on small, specific moments over grand gestures', 'Let the reader fill in the emotion — don\'t over-explain'],
  },
  professional: {
    definition: 'Professional captions convey authority and expertise. They\'re polished, data-informed, and value-packed — positioning you as a thought leader worth following.',
    bestFor: ['Industry insights', 'Career advice', 'Product launches', 'Business updates', 'LinkedIn-style storytelling'],
    notBestFor: ['Casual personal content', 'Meme-driven posts', 'Highly emotional storytelling', 'Niche internet humor'],
    beforeAfter: {
      before: 'Our product is really good.',
      after: 'We reduced customer onboarding time by 40% — here\'s the framework we used.',
    },
    writingTips: ['Lead with data or a specific result', 'Use "we" language for inclusivity', 'Structure with clear sections (problem → insight → action)', 'Avoid jargon that excludes your audience'],
  },
  luxury: {
    definition: 'Luxury captions evoke exclusivity, elegance, and aspiration. Every word should feel intentional and refined — less is more, and quality trumps quantity.',
    bestFor: ['High-end products', 'Travel & hospitality', 'Fashion editorials', 'Premium lifestyle content'],
    notBestFor: ['Budget-focused content', 'Mass-market products', 'Casual everyday posts', 'Humor-driven content'],
    beforeAfter: {
      before: 'Nice hotel room with a great view.',
      after: 'Where the horizon meets the suite. Some moments were made to be savored.',
    },
    writingTips: ['Use precise, evocative vocabulary', 'Keep sentences short and rhythmic', 'Suggest rather than describe — create desire through implication', 'White space in captions mirrors luxury design principles'],
  },
  minimalist: {
    definition: 'Minimalist captions let the content speak for itself. Clean, uncluttered, and purposeful — every word earns its place. The power is in what you don\'t say.',
    bestFor: ['Aesthetic feeds', 'Art and design', 'Product photography', 'Architecture content', 'Moody or cinematic posts'],
    notBestFor: ['Tutorial content', 'Long-form storytelling', 'Community-building posts', 'Content requiring context'],
    beforeAfter: {
      before: 'I\'m really enjoying this beautiful peaceful morning with my coffee at this quiet cafe.',
      after: 'Morning light. Coffee. Silence.',
    },
    writingTips: ['Cut every word that doesn\'t add meaning', 'Use periods instead of conjunctions', 'One idea per caption — never two', 'Emojis optional; if used, one maximum'],
  },
  friendly: {
    definition: 'Friendly captions feel like a conversation with a trusted friend. Warm, inclusive, and approachable — they make your audience feel like they belong.',
    bestFor: ['Community building', 'Q&A content', 'Welcome/introduction posts', 'Customer-facing brands', 'Personal brands'],
    notBestFor: ['Luxury positioning', 'Edgy or provocative content', 'Formal corporate communication', 'Content requiring authority'],
    beforeAfter: {
      before: 'New product available now.',
      after: 'Hey! We\'ve been working on something we think you\'re going to love — and it\'s finally here.',
    },
    writingTips: ['Use "you" and "we" to create connection', 'Ask genuine questions (not rhetorical ones)', 'Contractions make text feel conversational', 'Match your audience\'s everyday vocabulary'],
  },
  persuasive: {
    definition: 'Persuasive captions drive action through urgency, social proof, and clear value propositions. They\'re strategic, benefit-focused, and built to convert browsers into doers.',
    bestFor: ['Product launches', 'Limited-time offers', 'Lead generation', 'Course/service promotion', 'Conversion-focused content'],
    notBestFor: ['Brand awareness posts', 'Community discussion', 'Personal storytelling', 'Content without a clear CTA'],
    beforeAfter: {
      before: 'Check out our new course.',
      after: 'Over 2,000 creators joined in the first week. The doors close Friday — are you in?',
    },
    writingTips: ['Open with the biggest benefit, not the feature', 'Use specific numbers for credibility', 'Create urgency without being manipulative', 'End every caption with a clear, single CTA'],
  },
  inspirational: {
    definition: 'Inspirational captions uplift and motivate through authentic stories, hard-won wisdom, and genuine encouragement. They make your audience feel seen and capable.',
    bestFor: ['Transformation stories', 'Milestone celebrations', 'Monday motivation posts', 'Overcoming-adversity content', 'Goal-setting posts'],
    notBestFor: ['Product-focused selling', 'Technical how-to content', 'Casual/humorous content', 'News and updates'],
    beforeAfter: {
      before: 'I worked hard and things got better.',
      after: 'A year ago, I almost quit. Today, I\'m writing this from the life I used to daydream about. Keep going.',
    },
    writingTips: ['Ground inspiration in specific, real moments', 'Show the struggle, not just the success', 'Use "you" language to make it about the reader', 'End with a forward-looking statement or question'],
  },
  sarcastic: {
    definition: 'Sarcastic captions use dry wit, irony, and clever observations to entertain. They appeal to audiences who appreciate intelligent humor and aren\'t afraid of a little edge.',
    bestFor: ['Commentary on trends', 'Relatable everyday frustrations', 'Pop culture reactions', 'Brand personalities with edge'],
    notBestFor: ['Sensitive topics', 'New audience building (can alienate)', 'Customer service content', 'Genuine calls-to-action'],
    beforeAfter: {
      before: 'Mondays are tough.',
      after: 'Another Monday, another opportunity to pretend I\'m a morning person.',
    },
    writingTips: ['Say the opposite of what you mean — let context do the work', 'Target situations, not people', 'Keep a warm undertone — sarcasm should feel playful, not mean', 'One sarcastic line hits harder than a paragraph of it'],
  },
};

// ─── Per-layer FAQ differentiation ───────────────────────────────────────────

export function getPlatformFaqs(platform: Platform): { question: string; answer: string }[] {
  const info = PLATFORM_CONTENT[platform];
  const name = platform === 'x' ? 'X (Twitter)' : platform.charAt(0).toUpperCase() + platform.slice(1);
  return [
    { question: `What makes a great ${name} caption?`, answer: info.styleGuide },
    { question: `How long should my ${name} caption be?`, answer: info.lengthTip },
    { question: `How many hashtags should I use on ${name}?`, answer: info.hashtagTip },
    { question: `What kind of CTAs work best on ${name}?`, answer: info.ctaStyle },
    { question: `Should I use emojis in ${name} captions?`, answer: info.emojiUsage },
  ];
}

export function getTopicFaqs(topic: Topic, platformName: string): { question: string; answer: string }[] {
  const info = TOPIC_CONTENT[topic];
  const topicName = topic.charAt(0).toUpperCase() + topic.slice(1);
  return [
    { question: `How do I write engaging ${topicName.toLowerCase()} captions for ${platformName}?`, answer: info.captionAngle },
    { question: `What are good caption hooks for ${topicName.toLowerCase()} content?`, answer: `Some proven hooks: ${info.exampleHooks.join('; ')}. These opening lines create curiosity and stop the scroll.` },
    { question: `What CTAs work for ${topicName.toLowerCase()} posts?`, answer: info.ctaTypes.join('. ') + '.' },
    { question: `Any tips for ${topicName.toLowerCase()} content on social media?`, answer: info.contentTips },
  ];
}

export function getToneFaqs(tone: Tone): { question: string; answer: string }[] {
  const info = TONE_CONTENT[tone];
  const toneName = tone.charAt(0).toUpperCase() + tone.slice(1);
  return [
    { question: `What is a ${toneName.toLowerCase()} caption style?`, answer: info.definition },
    { question: `When should I use a ${toneName.toLowerCase()} tone?`, answer: `${toneName} tone works best for: ${info.bestFor.join(', ')}.` },
    { question: `When should I avoid a ${toneName.toLowerCase()} tone?`, answer: `Consider a different tone for: ${info.notBestFor.join(', ')}.` },
    { question: `How do I write in a ${toneName.toLowerCase()} tone?`, answer: info.writingTips.join('. ') + '.' },
  ];
}
