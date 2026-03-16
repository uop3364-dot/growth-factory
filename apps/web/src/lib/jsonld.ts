import { Platform, Topic, Tone, PLATFORM_INFO, TOPIC_INFO, TONE_INFO } from './seo-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://creatoraitools.tools';
const SITE_NAME = 'CreatorAITools';

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildToolSchema(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free AI-powered tools for social media creators. Generate captions, hashtags and CTAs for Instagram, TikTok, YouTube, X and Facebook.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/caption-generator/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free AI-powered tools for social media creators.',
    sameAs: [],
  };
}

export function getCaptionPageFaqs(platform?: string, topic?: string, _tone?: string) {
  const platformName = platform ? PLATFORM_INFO[platform as Platform]?.name || platform : 'social media';
  const _topicName = topic ? TOPIC_INFO[topic as Topic]?.name || topic : 'any topic';

  return [
    {
      question: `How do I write good ${platformName} captions?`,
      answer: `Use our free AI caption generator to create engaging ${platformName} captions. Enter your topic, choose a tone, and get 10+ caption suggestions instantly. Our tool generates captions optimized for ${platformName}'s algorithm and audience.`,
    },
    {
      question: `Is this caption generator free?`,
      answer: `Yes! Our AI caption generator is completely free to use. Generate unlimited captions for ${platformName} and other platforms. No sign-up required.`,
    },
    {
      question: `Can I customize the tone of my captions?`,
      answer: `Absolutely! Choose from 9 different tones: funny, cute, professional, luxury, minimalist, friendly, persuasive, inspirational, and sarcastic. Each tone produces captions perfectly suited for your brand voice.`,
    },
    {
      question: `What topics can I generate captions for?`,
      answer: `We support 15+ popular topics including travel, food, fitness, beauty, business, marketing, gaming, pets, fashion, motivation, technology, education, photography, music, and lifestyle. Each topic generates specialized captions with relevant hashtags.`,
    },
    {
      question: `Do you suggest hashtags too?`,
      answer: `Yes! Every caption generation includes 5 relevant hashtag suggestions optimized for ${platformName}. We also provide a CTA (call-to-action) suggestion to boost engagement.`,
    },
  ];
}
