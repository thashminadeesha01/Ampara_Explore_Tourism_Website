export interface Attraction {
  id: string;
  name: string;
  category: 'Nature' | 'Historical' | 'Religious' | 'Beaches' | 'Waterfalls' | 'Wildlife' | 'Cultural';
  distanceKm: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  highlights: string[];
  image: string;
  radialZone: '0-5km' | '5-15km' | '15-25km';
  location: string;
}

export interface InterestCategory {
  id: string;
  title: 'Nature' | 'Historical' | 'Religious' | 'Beaches' | 'Waterfalls' | 'Wildlife' | 'Cultural';
  count: number;
  iconName: string;
  color: string;
  bgLight: string;
}

export const interestCategories: InterestCategory[] = [
  { id: 'nature', title: 'Nature', count: 14, iconName: 'Trees', color: '#0284c7', bgLight: '#e0f2fe' },
  { id: 'historical', title: 'Historical', count: 9, iconName: 'Landmark', color: '#2563eb', bgLight: '#dbeafe' },
  { id: 'religious', title: 'Religious', count: 8, iconName: 'Church', color: '#0d9488', bgLight: '#ccfbf1' },
  { id: 'beaches', title: 'Beaches', count: 6, iconName: 'Waves', color: '#06b6d4', bgLight: '#cffafe' },
  { id: 'waterfalls', title: 'Waterfalls', count: 4, iconName: 'Droplets', color: '#3b82f6', bgLight: '#eff6ff' },
  { id: 'wildlife', title: 'Wildlife', count: 7, iconName: 'PawPrint', color: '#059669', bgLight: '#d1fae5' },
  { id: 'cultural', title: 'Cultural', count: 5, iconName: 'Theater', color: '#7c3aed', bgLight: '#ede9fe' },
];

export const amparaAttractions: Attraction[] = [
  {
    id: 'senanayake-samudraya',
    name: 'Senanayake Samudraya (Gal Oya Reservoir)',
    category: 'Nature',
    distanceKm: 18,
    duration: '2 - 3 Hours',
    rating: 4.9,
    reviewsCount: 382,
    description: 'The monumental reservoir built under the Gal Oya multipurpose project. Serene vast water body surrounded by misty peaks and famous boat safaris.',
    highlights: ['Sunset boat rides', 'Freshwater bird colonies', 'Historic dam sluice'],
    image: '/images/hero-bg.jpg',
    radialZone: '15-25km',
    location: 'Inginiyagala, Ampara',
  },
  {
    id: 'gal-oya-national-park',
    name: 'Gal Oya National Park Safari',
    category: 'Wildlife',
    distanceKm: 22,
    duration: 'Half Day (4 hrs)',
    rating: 4.9,
    reviewsCount: 512,
    description: 'The only park in Sri Lanka where you can witness swimming wild elephants crossing islands in the reservoir on a motorized boat safari.',
    highlights: ['Swimming elephant sightings', 'Bird Island', 'Untouched rainforest'],
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80',
    radialZone: '15-25km',
    location: 'Gal Oya Valley',
  },
  {
    id: 'deegawapi-stupa',
    name: 'Deegawapi Sacred Stupa',
    category: 'Religious',
    distanceKm: 16,
    duration: '1.5 Hours',
    rating: 4.8,
    reviewsCount: 290,
    description: 'One of the Solosmasthana (16 sacred Buddhist places) blessed by Lord Buddha. An awe-inspiring archaeological site with deep royal heritage.',
    highlights: ['Ancient relic chamber', 'Sacred pilgrims pond', 'Historic inscriptions'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    radialZone: '15-25km',
    location: 'Deegawapiya, Ampara',
  },
  {
    id: 'buddhangala-monastery',
    name: 'Buddhangala Forest Hermitage',
    category: 'Religious',
    distanceKm: 8,
    duration: '2 Hours',
    rating: 4.9,
    reviewsCount: 340,
    description: 'Ancient secluded cave monastery perched atop monolithic rock boulders with sweeping 360-degree panoramic jungle views and holy relics.',
    highlights: ['Rock stupa at summit', 'Serene meditation paths', 'Wild deer roaming freely'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    radialZone: '5-15km',
    location: 'Buddhangala Forest, Ampara',
  },
  {
    id: 'rajagala-archaeological-site',
    name: 'Rajagala (Rassahela) Heritage Mountain',
    category: 'Historical',
    distanceKm: 23,
    duration: '3 - 4 Hours',
    rating: 4.9,
    reviewsCount: 195,
    description: 'A 1,000-acre dense mountain monastery containing over 500 ancient ruins, stone stupas, and the sacred ash stupa of Arhat Mahinda.',
    highlights: ['500+ Ancient ruins', 'Arhat Mahinda stupa', 'Canopy nature hike'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    radialZone: '15-25km',
    location: 'Bakkiella, Ampara',
  },
  {
    id: 'ampara-peace-pagoda',
    name: 'Ampara Japanese Peace Pagoda & Lake',
    category: 'Religious',
    distanceKm: 3,
    duration: '1 Hour',
    rating: 4.7,
    reviewsCount: 220,
    description: 'Gleaming white dome built by Nipponzan Myohoji monks overlooking the tranquil Ampara tank, illuminated beautifully at dusk.',
    highlights: ['Sunset reflections', 'Golden statues', 'Peaceful walking promenade'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    radialZone: '0-5km',
    location: 'Ampara Town Lake Road',
  },
  {
    id: 'panama-kudumbigala',
    name: 'Kudumbigala Forest Sanctuary',
    category: 'Nature',
    distanceKm: 25,
    duration: '3 Hours',
    rating: 4.9,
    reviewsCount: 180,
    description: 'Sprawling granite wilderness where monolithic peaks rise above dense dry-zone forest, home to ancient meditation caves and wildlife.',
    highlights: ['Cylindrical stupa', 'Epic sunrise vistas', 'Pristine biodiversity'],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    radialZone: '15-25km',
    location: 'Kudumbigala, Eastern Frontier',
  },
  {
    id: 'muhudu-maha-viharaya',
    name: 'Muhudu Maha Viharaya & Dunes',
    category: 'Historical',
    distanceKm: 25,
    duration: '2 Hours',
    rating: 4.8,
    reviewsCount: 410,
    description: 'Historic beachside temple marking where Queen Viharamahadevi landed thousands of years ago, featuring standing Buddha statues surrounded by dunes.',
    highlights: ['Ancient carved stone statues', 'Ocean breeze', 'Historical lore'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    radialZone: '15-25km',
    location: 'Pottuvil / Coastal Horizon',
  }
];
