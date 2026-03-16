import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HashtagGenerator from '@/components/HashtagGenerator';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateCTA from '@/components/AffiliateCTA';
import { buildToolSchema, buildBreadcrumbSchema } from '@/lib/jsonld';
import Link from 'next/link';

const PLATFORMS = ['instagram', 'tiktok', 'youtube', 'x', 'linkedin'] as const;
type Platform = (typeof PLATFORMS)[number];

const NICHES = [
  'travel', 'food', 'fitness', 'beauty', 'business', 'marketing',
  'technology', 'gaming', 'pets', 'fashion', 'photography', 'music',
  'lifestyle', 'education', 'art',
] as const;
type Niche = (typeof NICHES)[number];

const PLATFORM_NAMES: Record<Platform, { name: string; emoji: string }> = {
  instagram: { name: 'Instagram', emoji: '📸' },
  tiktok: { name: 'TikTok', emoji: '🎵' },
  youtube: { name: 'YouTube', emoji: '▶️' },
  x: { name: 'X (Twitter)', emoji: '𝕏' },
  linkedin: { name: 'LinkedIn', emoji: '💼' },
};

const NICHE_INFO: Record<Niche, { name: string; emoji: string; description: string; tips: string[]; exampleHashtags: string[] }> = {
  travel: {
    name: 'Travel',
    emoji: '✈️',
    description: 'Discover the best travel hashtags to showcase your adventures and attract fellow wanderers.',
    tips: [
      'Use location-specific hashtags like #VisitJapan or #ParisTravel alongside general travel tags',
      'Tag the type of travel: #SoloTravel, #FamilyTravel, #BackpackingLife',
      'Include seasonal tags like #SummerTravel or #WinterWonderland when relevant',
      'Use accommodation hashtags like #HostelLife or #LuxuryResort to reach niche audiences',
    ],
    exampleHashtags: ['#TravelGram', '#Wanderlust', '#TravelPhotography', '#InstaTravel', '#ExploreMore', '#TravelBlogger', '#Backpacking', '#TravelAddict', '#Vacation', '#Adventure'],
  },
  food: {
    name: 'Food',
    emoji: '🍕',
    description: 'Find trending food hashtags to make your culinary content irresistible and reach hungry audiences.',
    tips: [
      'Specify cuisine type: #ItalianFood, #JapaneseFood, #MexicanCuisine',
      'Use meal-specific hashtags: #BreakfastIdeas, #LunchPrep, #DinnerParty',
      'Include dietary tags: #Vegan, #GlutenFree, #Keto for niche audiences',
      'Tag your cooking method: #HomeCooking, #MealPrep, #Baking, #Grilling',
    ],
    exampleHashtags: ['#Foodie', '#FoodPhotography', '#InstaFood', '#FoodBlogger', '#Homemade', '#FoodPorn', '#Yummy', '#Delicious', '#RecipeOfTheDay', '#FoodLover'],
  },
  fitness: {
    name: 'Fitness',
    emoji: '💪',
    description: 'Power up your fitness content with the best workout and health hashtags for maximum motivation and reach.',
    tips: [
      'Specify workout type: #WeightLifting, #Yoga, #HIIT, #CrossFit, #Running',
      'Use transformation hashtags: #FitnessJourney, #ProgressNotPerfection',
      'Include body-part focused tags: #LegDay, #AbWorkout, #ArmDay',
      'Tag your fitness goal: #WeightLoss, #MuscleGain, #Flexibility, #Endurance',
    ],
    exampleHashtags: ['#FitnessMotivation', '#GymLife', '#Workout', '#FitFam', '#PersonalTrainer', '#FitnessGoals', '#HealthyLifestyle', '#Exercise', '#TrainHard', '#FitLife'],
  },
  beauty: {
    name: 'Beauty',
    emoji: '💄',
    description: 'Glow up your beauty content with trending hashtags that connect you with beauty enthusiasts.',
    tips: [
      'Specify beauty category: #Skincare, #Makeup, #HairCare, #NailArt',
      'Use tutorial hashtags: #MakeupTutorial, #GRWM, #BeautyTips',
      'Include product-type tags: #Lipstick, #Foundation, #Serum, #Moisturizer',
      'Tag beauty trends: #CleanBeauty, #GlassSkin, #NaturalBeauty',
    ],
    exampleHashtags: ['#BeautyBlogger', '#MakeupLover', '#SkincarRoutine', '#BeautyTips', '#MakeupOfTheDay', '#BeautyCommunity', '#GlowUp', '#BeautyAddict', '#Cosmetics', '#InstaBeauty'],
  },
  business: {
    name: 'Business',
    emoji: '💰',
    description: 'Grow your business presence with strategic hashtags that attract clients, partners, and opportunities.',
    tips: [
      'Use industry-specific tags: #TechStartup, #RealEstate, #Ecommerce',
      'Include entrepreneurship hashtags: #Entrepreneur, #SmallBusiness, #StartupLife',
      'Tag business goals: #GrowthHacking, #ScaleUp, #Revenue',
      'Use leadership tags: #CEO, #Founder, #BusinessOwner for credibility',
    ],
    exampleHashtags: ['#Business', '#Entrepreneur', '#SmallBusiness', '#StartupLife', '#BusinessTips', '#Success', '#Motivation', '#Hustle', '#BusinessOwner', '#GrowYourBusiness'],
  },
  marketing: {
    name: 'Marketing',
    emoji: '📈',
    description: 'Amplify your marketing content with hashtags that reach fellow marketers and potential clients.',
    tips: [
      'Specify marketing channel: #ContentMarketing, #EmailMarketing, #SEO, #PPC',
      'Use strategy hashtags: #MarketingStrategy, #GrowthHacking, #BrandStrategy',
      'Include tool-specific tags: #GoogleAds, #FacebookAds, #Analytics',
      'Tag marketing trends: #AIMarketing, #InfluencerMarketing, #VideoMarketing',
    ],
    exampleHashtags: ['#DigitalMarketing', '#SocialMediaMarketing', '#ContentMarketing', '#MarketingTips', '#OnlineMarketing', '#BrandMarketing', '#MarketingStrategy', '#SEO', '#Branding', '#MarketingDigital'],
  },
  technology: {
    name: 'Technology',
    emoji: '💻',
    description: 'Stay ahead with trending tech hashtags that connect you with the developer and tech enthusiast community.',
    tips: [
      'Specify tech domain: #WebDev, #AI, #Cybersecurity, #CloudComputing',
      'Use programming language tags: #Python, #JavaScript, #React, #TypeScript',
      'Include industry tags: #SaaS, #FinTech, #EdTech, #HealthTech',
      'Tag tech events and trends: #TechNews, #Innovation, #FutureTech',
    ],
    exampleHashtags: ['#Technology', '#TechNews', '#Programming', '#CodingLife', '#Developer', '#AI', '#MachineLearning', '#Innovation', '#TechTrends', '#Software'],
  },
  gaming: {
    name: 'Gaming',
    emoji: '🎮',
    description: 'Level up your gaming content with hashtags that reach gamers, streamers, and the gaming community.',
    tips: [
      'Tag specific games: #Fortnite, #Minecraft, #Valorant, #GenshinImpact',
      'Use platform tags: #PCGaming, #PS5, #XboxSeriesX, #NintendoSwitch',
      'Include content type: #GameReview, #LetsPlay, #GamingClips, #Speedrun',
      'Tag gaming events: #E3, #GameAwards, #GamingCommunity',
    ],
    exampleHashtags: ['#Gaming', '#Gamer', '#GamingCommunity', '#Gameplay', '#VideoGames', '#Streamer', '#GamersOfInstagram', '#GamingLife', '#PCGaming', '#RetroGaming'],
  },
  pets: {
    name: 'Pets',
    emoji: '🐾',
    description: 'Make your furry friends famous with the best pet hashtags that animal lovers follow.',
    tips: [
      'Specify pet type: #DogsOfInstagram, #CatsOfInstagram, #Rabbits',
      'Use breed-specific tags: #GoldenRetriever, #FrenchBulldog, #Ragdoll',
      'Include activity hashtags: #DogWalk, #PetPhotography, #CatNap',
      'Tag pet lifestyle: #PetMom, #FurBaby, #PetLover, #AdoptDontShop',
    ],
    exampleHashtags: ['#PetsOfInstagram', '#DogsOfInstagram', '#CatsOfInstagram', '#PetLover', '#FurBaby', '#PetPhotography', '#CutePets', '#AnimalLover', '#PuppyLove', '#CatLovers'],
  },
  fashion: {
    name: 'Fashion',
    emoji: '👗',
    description: 'Style your fashion posts with trending hashtags that showcase your looks to fashion-forward audiences.',
    tips: [
      'Specify style: #StreetStyle, #Minimalist, #Vintage, #Bohemian',
      'Use occasion hashtags: #OOTD, #WorkWear, #DateNight, #FestivalFashion',
      'Include seasonal tags: #SummerStyle, #FallFashion, #WinterOutfit',
      'Tag fashion categories: #Accessories, #Shoes, #Denim, #Athleisure',
    ],
    exampleHashtags: ['#Fashion', '#OOTD', '#FashionBlogger', '#Style', '#StreetStyle', '#FashionInspo', '#Outfit', '#FashionStyle', '#Trendy', '#WhatIWore'],
  },
  photography: {
    name: 'Photography',
    emoji: '📷',
    description: 'Showcase your photography skills with hashtags that connect you with the photography community.',
    tips: [
      'Specify photography type: #PortraitPhotography, #Landscape, #StreetPhotography',
      'Use gear tags: #SonyAlpha, #CanonPhotography, #NikonCreators',
      'Include technique hashtags: #LongExposure, #GoldenHour, #Bokeh',
      'Tag photo communities: #PhotoOfTheDay, #IGDaily, #500px',
    ],
    exampleHashtags: ['#Photography', '#PhotoOfTheDay', '#NaturePhotography', '#PortraitPhotography', '#StreetPhotography', '#LandscapePhotography', '#Photographer', '#Canon', '#SonyAlpha', '#ShotOnIPhone'],
  },
  music: {
    name: 'Music',
    emoji: '🎸',
    description: 'Amplify your music content with hashtags that reach music lovers, fellow artists, and industry professionals.',
    tips: [
      'Specify genre: #HipHop, #IndieMusic, #Electronic, #RockMusic, #Jazz',
      'Use musician tags: #Singer, #Guitarist, #Producer, #Songwriter',
      'Include content type: #CoverSong, #OriginalMusic, #LivePerformance',
      'Tag music platforms: #Spotify, #SoundCloud, #NewMusic, #NowPlaying',
    ],
    exampleHashtags: ['#Music', '#Musician', '#NewMusic', '#MusicProducer', '#Singer', '#IndieMusic', '#HipHop', '#LiveMusic', '#SongWriter', '#MusicIsLife'],
  },
  lifestyle: {
    name: 'Lifestyle',
    emoji: '🌿',
    description: 'Curate your lifestyle content with hashtags that inspire and connect with like-minded audiences.',
    tips: [
      'Specify lifestyle niche: #MinimalistLiving, #SelfCare, #MorningRoutine',
      'Use wellness tags: #MindfulLiving, #HealthyHabits, #WellnessJourney',
      'Include home-related hashtags: #HomeDecor, #CozyVibes, #PlantMom',
      'Tag daily life content: #DailyInspiration, #LifeHacks, #ProductiveDay',
    ],
    exampleHashtags: ['#Lifestyle', '#LifestyleBlogger', '#DailyLife', '#SelfCare', '#Minimalism', '#HealthyLifestyle', '#Wellness', '#MorningRoutine', '#LifeIsGood', '#SimpleLife'],
  },
  education: {
    name: 'Education',
    emoji: '📚',
    description: 'Educate and inspire with hashtags that reach students, teachers, and lifelong learners.',
    tips: [
      'Specify education level: #HigherEducation, #K12, #OnlineLearning',
      'Use subject tags: #STEM, #Science, #Math, #History, #Languages',
      'Include educator hashtags: #TeachersOfInstagram, #EdTech, #TeachingTips',
      'Tag learning content: #StudyTips, #LearnOnTikTok, #EducationalContent',
    ],
    exampleHashtags: ['#Education', '#Learning', '#StudyTips', '#Teacher', '#OnlineLearning', '#EdTech', '#STEM', '#StudyMotivation', '#KnowledgeIsPower', '#LearnSomethingNew'],
  },
  art: {
    name: 'Art',
    emoji: '🎨',
    description: 'Share your creative work with hashtags that connect you with art lovers, collectors, and fellow artists.',
    tips: [
      'Specify art medium: #DigitalArt, #Watercolor, #OilPainting, #Sculpture',
      'Use process hashtags: #ArtProcess, #WorkInProgress, #SpeedPaint',
      'Include style tags: #AbstractArt, #Realism, #PopArt, #Surrealism',
      'Tag art communities: #ArtistOnInstagram, #InstaArt, #ArtCommunity',
    ],
    exampleHashtags: ['#Art', '#Artist', '#DigitalArt', '#ArtWork', '#Drawing', '#Painting', '#Illustration', '#ArtOfTheDay', '#CreativeArt', '#InstaArt'],
  },
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
  if (!PLATFORMS.includes(platform as Platform) || !NICHES.includes(niche as Niche)) return {};
  const pInfo = PLATFORM_NAMES[platform as Platform];
  const nInfo = NICHE_INFO[niche as Niche];
  const title = `Best ${pInfo.name} ${nInfo.name} Hashtags | Free AI Generator | CreatorAITools`;
  const description = `Generate the best ${nInfo.name.toLowerCase()} hashtags for ${pInfo.name}. Our free AI tool creates trending, niche, and high-performing hashtag sets to boost your ${nInfo.name.toLowerCase()} content.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `/hashtag-generator/${platform}/${niche}` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `/hashtag-generator/${platform}/${niche}` },
  };
}

export default async function NicheHashtagPage({ params }: { params: Promise<{ platform: string; niche: string }> }) {
  const { platform: platformStr, niche: nicheStr } = await params;
  const platform = platformStr as Platform;
  const niche = nicheStr as Niche;
  if (!PLATFORMS.includes(platform) || !NICHES.includes(niche)) notFound();
  const pInfo = PLATFORM_NAMES[platform];
  const nInfo = NICHE_INFO[niche];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema({ name: `${pInfo.name} ${nInfo.name} Hashtag Generator`, description: `Generate the best ${nInfo.name.toLowerCase()} hashtags for ${pInfo.name}`, path: `/hashtag-generator/${platform}/${niche}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Hashtag Generator', path: '/hashtag-generator' },
        { name: pInfo.name, path: `/hashtag-generator/${platform}` },
        { name: nInfo.name, path: `/hashtag-generator/${platform}/${niche}` },
      ])) }} />

      <section className="bg-gradient-to-br from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{nInfo.emoji} {pInfo.name} {nInfo.name} Hashtags</h1>
          <p className="text-lg text-pink-100">{nInfo.description}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <HashtagGenerator defaultPlatform={platform} defaultNiche={niche} />

        {/* Niche Tips */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{nInfo.name} Hashtag Tips for {pInfo.name}</h2>
          <ul className="space-y-2 mb-6">
            {nInfo.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-pink-500 mt-1 flex-shrink-0">&#10003;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-medium text-gray-800 mb-3">Popular {nInfo.name} Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {nInfo.exampleHashtags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <AdPlaceholder slot="after-generator" />
        <AffiliateCTA pageType="hashtag-niche" />

        {/* Other Niches for this Platform */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">More {pInfo.name} Hashtag Niches</h2>
          <div className="flex flex-wrap gap-2">
            {NICHES.filter(n => n !== niche).map(n => (
              <Link
                key={n}
                href={`/hashtag-generator/${platform}/${n}`}
                className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors capitalize"
              >
                {n}
              </Link>
            ))}
          </div>
        </div>

        {/* Other Platforms for this Niche */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">{nInfo.name} Hashtags on Other Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter(p => p !== platform).map(p => {
              const pi = PLATFORM_NAMES[p];
              return (
                <Link
                  key={p}
                  href={`/hashtag-generator/${p}/${niche}`}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {pi.emoji} {pi.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
