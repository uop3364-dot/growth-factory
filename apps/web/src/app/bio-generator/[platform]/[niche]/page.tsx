import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BioGenerator from '@/components/BioGenerator';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import HeroCTA from '@/components/HeroCTA';
import { ToolPageLayout } from '@/components/brand';
import { brandCopy } from '@/lib/brandCopy';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import Link from 'next/link';
import {
  BIO_PLATFORMS,
  BIO_NICHES,
  PLATFORM_LABELS,
  PLATFORM_CHAR_LIMITS,
  NICHE_LABELS,
} from '@/lib/bio-generator';
import type { BioPlatform, BioNiche } from '@/lib/bio-generator';

const PLATFORMS = BIO_PLATFORMS;
const NICHES = BIO_NICHES;

const NICHE_TIPS: Record<BioNiche, string[]> = {
  creator: [
    'Highlight the type of content you create (video, photo, written)',
    'Mention your posting frequency or content schedule',
    'Include collaboration or sponsorship availability',
    'Show your personality - creators thrive on authenticity',
    'Add a branded hashtag for community building',
  ],
  entrepreneur: [
    'Lead with your company name or venture',
    'Mention your industry or market focus',
    'Include notable achievements (revenue, users, awards)',
    'Add a value proposition that resonates with your audience',
    'Include a CTA for investors or customers',
  ],
  freelancer: [
    'State your service offering clearly',
    'Mention your availability or booking status',
    'Include key skills or tools you specialize in',
    'Add social proof (years of experience, client count)',
    'Include a CTA to hire or contact you',
  ],
  marketer: [
    'Highlight your marketing specialty (SEO, paid, content, growth)',
    'Include measurable results you have achieved',
    'Mention notable brands or industries you have worked with',
    'Show thought leadership credentials',
    'Add a CTA to download resources or book a call',
  ],
  developer: [
    'List your primary tech stack or languages',
    'Mention open-source contributions or projects',
    'Include your specialty (frontend, backend, full-stack, mobile)',
    'Add a link to your GitHub or portfolio',
    'Show your passion for building and problem-solving',
  ],
  designer: [
    'Specify your design discipline (UI/UX, graphic, brand, product)',
    'Mention tools you work with (Figma, Adobe, etc.)',
    'Include your design philosophy in a few words',
    'Link to your portfolio or Dribbble',
    'Show your aesthetic through your bio formatting',
  ],
  photographer: [
    'Specify your photography niche (portrait, landscape, wedding, commercial)',
    'Mention your location or availability for travel',
    'Include your shooting style or editing aesthetic',
    'Add booking or inquiry CTA',
    'Reference notable publications or clients',
  ],
  fitness: [
    'Include your certifications or qualifications',
    'Mention your fitness specialty (strength, yoga, HIIT, etc.)',
    'Add transformation results or client success stories',
    'Include a CTA for coaching or programs',
    'Show your personal fitness journey briefly',
  ],
  food: [
    'Specify your food niche (recipes, reviews, healthy eating, baking)',
    'Mention your cuisine specialty or dietary focus',
    'Include any published cookbooks or media features',
    'Add a CTA for recipe collections or collaborations',
    'Show your food philosophy in a catchy way',
  ],
  travel: [
    'Mention countries visited or current location',
    'Specify your travel style (budget, luxury, adventure, family)',
    'Include travel tips or guide availability',
    'Add a CTA for travel consultation or itineraries',
    'Show your wanderlust through creative language',
  ],
  student: [
    'Mention your field of study or university',
    'Include relevant projects or research interests',
    'Show your career aspirations or goals',
    'Add internship or collaboration availability',
    'Include relevant extracurricular activities',
  ],
  musician: [
    'Mention your genre or instrument',
    'Include streaming platform links',
    'Add upcoming shows or release dates',
    'Reference notable achievements (streams, awards, features)',
    'Show your musical identity in your tone',
  ],
  artist: [
    'Specify your art medium (digital, oil, watercolor, mixed media)',
    'Mention gallery shows or exhibitions',
    'Include commission availability',
    'Add a link to your shop or portfolio',
    'Express your artistic vision concisely',
  ],
  writer: [
    'Mention your writing niche (fiction, copywriting, journalism, poetry)',
    'Include published works or notable publications',
    'Add your writing style or themes you explore',
    'Include a CTA for freelance inquiries or newsletter',
    'Show your voice through your bio writing style',
  ],
  coach: [
    'Specify your coaching specialty (life, business, health, career)',
    'Include certifications or methodology',
    'Add client results or testimonials reference',
    'Include a CTA to book a discovery call',
    'Show your coaching philosophy briefly',
  ],
};

export function generateStaticParams() {
  const params: { platform: string; niche: string }[] = [];
  for (const platform of PLATFORMS) {
    for (const niche of NICHES) {
      params.push({ platform, niche });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string; niche: string }> }): Promise<Metadata> {
  const { platform, niche } = await params;
  if (!PLATFORMS.includes(platform as BioPlatform) || !NICHES.includes(niche as BioNiche)) return {};
  const platformInfo = PLATFORM_LABELS[platform as BioPlatform];
  const nicheInfo = NICHE_LABELS[niche as BioNiche];
  const title = `${platformInfo.name} Bio for ${nicheInfo.name}s | Free AI Generator | CreatorAITools`;
  const description = `Generate the perfect ${platformInfo.name} bio for ${nicheInfo.name.toLowerCase()}s. Our free AI bio generator creates ${niche}-specific bios optimized for ${platformInfo.name}'s ${PLATFORM_CHAR_LIMITS[platform as BioPlatform]}-character limit.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/bio-generator/${platform}/${niche}`,
    },
    alternates: {
      canonical: `/bio-generator/${platform}/${niche}`,
    },
  };
}

export default async function BioNichePage({ params }: { params: Promise<{ platform: string; niche: string }> }) {
  const { platform: platformStr, niche: nicheStr } = await params;
  const platform = platformStr as BioPlatform;
  const niche = nicheStr as BioNiche;
  if (!PLATFORMS.includes(platform) || !NICHES.includes(niche)) notFound();

  const platformInfo = PLATFORM_LABELS[platform];
  const nicheInfo = NICHE_LABELS[niche];
  const charLimit = PLATFORM_CHAR_LIMITS[platform];
  const tips = NICHE_TIPS[niche];
  const description = `Generate the perfect ${platformInfo.name} bio for ${nicheInfo.name.toLowerCase()}s. AI-powered, free, and optimized for ${platformInfo.name}'s ${charLimit}-character limit.`;

  return (
    <ToolPageLayout
      scripts={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${platformInfo.name} Bio Generator for ${nicheInfo.name}s`, description, path: `/bio-generator/${platform}/${niche}` })) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Bio Generator', path: '/bio-generator' },
            { name: platformInfo.name, path: `/bio-generator/${platform}` },
            { name: nicheInfo.name, path: `/bio-generator/${platform}/${niche}` },
          ])) }} />
        </>
      }
      heroHint={brandCopy.empty[3]}
      heroContent={
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{platformInfo.emoji} {platformInfo.name} Bio for {nicheInfo.name}s</h1>
          <p className="text-lg text-white/85">Free AI-powered bio generator tailored for {nicheInfo.name.toLowerCase()}s on {platformInfo.name}. Create bios that fit within {charLimit} characters.</p>
          <HeroCTA toolName={`bio-${platform}-${niche}`} />
        </div>
      }
    >
        <BioGenerator defaultPlatform={platform} defaultNiche={niche} />

        {/* Niche-specific tips */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tips for {nicheInfo.name} Bios on {platformInfo.name}</h2>
          <p className="text-gray-700 mb-4">
            As a {nicheInfo.name.toLowerCase()}, your {platformInfo.name} bio needs to instantly communicate who you are, what you offer, and why someone should follow you - all within {charLimit} characters. Here are specific tips to make your {nicheInfo.name.toLowerCase()} bio stand out:
          </p>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="bio-niche" />

        {/* Same platform, other niches */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">More {platformInfo.name} Bios by Niche</h2>
          <div className="flex flex-wrap gap-2">
            {NICHES.filter(n => n !== niche).map(n => (
              <Link
                key={n}
                href={`/bio-generator/${platform}/${n}`}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                {NICHE_LABELS[n].emoji} {platformInfo.name} Bio for {NICHE_LABELS[n].name}s
              </Link>
            ))}
          </div>
        </div>

        {/* Same niche, other platforms */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">{nicheInfo.name} Bios on Other Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter(p => p !== platform).map(p => (
              <Link
                key={p}
                href={`/bio-generator/${p}/${niche}`}
                className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm hover:bg-teal-100 transition-colors"
              >
                {PLATFORM_LABELS[p].emoji} {PLATFORM_LABELS[p].name} Bio for {nicheInfo.name}s
              </Link>
            ))}
          </div>
        </div>
    </ToolPageLayout>
  );
}
