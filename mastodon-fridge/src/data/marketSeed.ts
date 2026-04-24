import { ImageSourcePropType } from 'react-native';

export type MarketCategory = 'Sports' | 'Arts' | 'Food' | 'Clubs' | 'Academic';
export type MarketFilter = 'All' | MarketCategory;

export interface EventPhoto {
  id: string;
  imageSource?: ImageSourcePropType;
  authorName: string;
  authorInitial?: string;
  caption?: string;
  postedAt: string;
}

export interface MarketFlyer {
  id: string;
  title: string;
  organizationId: string;
  category: MarketCategory;
  imageSource?: ImageSourcePropType;
  date: string;
  location: string;
  featured?: boolean;
  photos?: EventPhoto[];
}

export const MARKET_CATEGORIES: MarketFilter[] = [
  'All',
  'Clubs',
  'Sports',
  'Food',
  'Arts',
  'Academic',
];

export const MARKET_FLYERS: MarketFlyer[] = [
  {
    id: 'm-food-pizza',
    title: 'Free Pizza Friday',
    organizationId: 'student-life',
    category: 'Food',
    date: 'Apr 25',
    location: 'Walb Student Union',
    featured: true,
    photos: [
      {
        id: 'p-pizza-1',
        authorName: 'Maya Chen',
        authorInitial: 'M',
        caption: 'Line was out the door but SO worth it 🍕',
        postedAt: '2h',
      },
      {
        id: 'p-pizza-2',
        authorName: 'Jordan Blake',
        authorInitial: 'J',
        caption: 'pepperoni > hawaiian, fight me',
        postedAt: '3h',
      },
      {
        id: 'p-pizza-3',
        authorName: 'Sam Patel',
        authorInitial: 'S',
        caption: 'Met half my stats class in line. Accidental study group.',
        postedAt: '4h',
      },
      {
        id: 'p-pizza-4',
        authorName: 'Riley Ng',
        authorInitial: 'R',
        postedAt: '5h',
      },
    ],
  },
  {
    id: 'm-arts-showcase',
    title: 'Spring Showcase',
    organizationId: 'visual-performing-arts',
    category: 'Arts',
    date: 'May 03',
    location: 'Williams Theatre',
    featured: true,
    photos: [
      {
        id: 'p-showcase-1',
        authorName: 'Ana Ortiz',
        authorInitial: 'A',
        caption: 'The dance piece at the end — chills.',
        postedAt: 'yesterday',
      },
      {
        id: 'p-showcase-2',
        authorName: 'Theo Mack',
        authorInitial: 'T',
        caption: 'Lighting design was unreal.',
        postedAt: 'yesterday',
      },
      {
        id: 'p-showcase-3',
        authorName: 'Lena Kim',
        authorInitial: 'L',
        postedAt: '2d',
      },
    ],
  },
  {
    id: 'm-clubs-hack',
    title: 'Hack Night: Bring Your Laptop',
    organizationId: 'pfw-coding-club',
    category: 'Clubs',
    date: 'Apr 26',
    location: 'ET 115',
  },
  {
    id: 'm-sports-esports',
    title: 'Mastodon Esports Tryouts',
    organizationId: 'pfw-esports',
    category: 'Sports',
    date: 'Apr 27',
    location: 'Gates Sports Center',
    photos: [
      {
        id: 'p-esports-1',
        authorName: 'Devon Shaw',
        authorInitial: 'D',
        caption: 'Valorant bracket is stacked this year.',
        postedAt: '1h',
      },
      {
        id: 'p-esports-2',
        authorName: 'Priya Iyer',
        authorInitial: 'P',
        caption: 'Setup looks clean. Finally a real desk.',
        postedAt: '2h',
      },
      {
        id: 'p-esports-3',
        authorName: 'Kai Brooks',
        authorInitial: 'K',
        postedAt: '6h',
      },
    ],
  },
  {
    id: 'm-arts-jazz',
    title: 'Jazz Combo @ Rhinehart',
    organizationId: 'school-of-music',
    category: 'Arts',
    date: 'Apr 29',
    location: 'Rhinehart Recital Hall',
  },
  {
    id: 'm-academic-library',
    title: 'Library After-Dark',
    organizationId: 'helmke-library',
    category: 'Academic',
    date: 'May 01',
    location: 'Helmke 2F',
  },
  {
    id: 'm-food-coffee',
    title: 'Coffee & Code',
    organizationId: 'pfw-coding-club',
    category: 'Food',
    date: 'Apr 28',
    location: 'Starbucks Walb',
  },
  {
    id: 'm-clubs-greek',
    title: 'Greek Life Open House',
    organizationId: 'student-orgs',
    category: 'Clubs',
    date: 'May 02',
    location: 'Walb Ballroom',
  },
  {
    id: 'm-sports-dodgeball',
    title: 'Intramural Dodgeball',
    organizationId: 'rec-fitness',
    category: 'Sports',
    date: 'Apr 30',
    location: 'Hilliard Gates Arena',
  },
  {
    id: 'm-food-trucks',
    title: 'Food Truck Rally',
    organizationId: 'mastodon-activities',
    category: 'Food',
    date: 'May 04',
    location: 'Lot R1',
  },
  {
    id: 'm-clubs-intl',
    title: 'International Fest',
    organizationId: 'intl-students',
    category: 'Clubs',
    date: 'May 05',
    location: 'Walb Student Union',
  },
  {
    id: 'm-academic-poster',
    title: 'Research Poster Night',
    organizationId: 'office-of-research',
    category: 'Academic',
    date: 'May 06',
    location: 'Science Atrium',
  },
  {
    id: 'm-arts-market',
    title: 'Don Day Art Market',
    organizationId: 'student-artists',
    category: 'Arts',
    date: 'May 07',
    location: 'Quad Lawn',
  },
  {
    id: 'm-sports-bootcamp',
    title: 'Rec Fit Bootcamp',
    organizationId: 'rec-fitness',
    category: 'Sports',
    date: 'May 08',
    location: 'Gates Sports Center',
  },
  {
    id: 'm-academic-career',
    title: 'Career Lab: Résumé Review',
    organizationId: 'career-development',
    category: 'Academic',
    date: 'May 09',
    location: 'KT 109',
  },
  {
    id: 'm-clubs-mastodon-meetup',
    title: 'New Dons Meet & Greet',
    organizationId: 'mastodon-activities',
    category: 'Clubs',
    date: 'May 10',
    location: 'Walb Plaza',
  },
];
