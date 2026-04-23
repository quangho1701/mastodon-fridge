import { ImageSourcePropType } from 'react-native';

export type MarketCategory = 'Sports' | 'Arts' | 'Food' | 'Clubs' | 'Academic';
export type MarketFilter = 'All' | MarketCategory;

export interface MarketFlyer {
  id: string;
  title: string;
  club: string;
  category: MarketCategory;
  imageSource?: ImageSourcePropType;
  placeholderColor: string;
  aspectRatio: number;
  date: string;
  location: string;
  featured?: boolean;
}

export const MARKET_CATEGORIES: MarketFilter[] = [
  'All',
  'Clubs',
  'Sports',
  'Food',
  'Arts',
  'Academic',
];

const PALETTE = {
  goldSoft: '#F1D77A',
  goldDeep: '#CFB991',
  ivory: '#EFE7D6',
  cream: '#E4DAC4',
  terracotta: '#D9A074',
  sage: '#A7B89A',
  sky: '#B9CCD6',
  dusk: '#6F7A89',
  rose: '#D9A7A7',
  charcoal: '#3E3E3E',
};

export const MARKET_FLYERS: MarketFlyer[] = [
  {
    id: 'm-food-pizza',
    title: 'Free Pizza Friday',
    club: 'Student Life',
    category: 'Food',
    placeholderColor: PALETTE.terracotta,
    aspectRatio: 0.75,
    date: 'Apr 25',
    location: 'Walb Student Union',
    featured: true,
  },
  {
    id: 'm-arts-showcase',
    title: 'Spring Showcase',
    club: 'PFW College of Visual & Performing Arts',
    category: 'Arts',
    placeholderColor: PALETTE.rose,
    aspectRatio: 0.8,
    date: 'May 03',
    location: 'Williams Theatre',
    featured: true,
  },
  {
    id: 'm-clubs-hack',
    title: 'Hack Night: Bring Your Laptop',
    club: 'PFW Coding Club',
    category: 'Clubs',
    placeholderColor: PALETTE.charcoal,
    aspectRatio: 1.0,
    date: 'Apr 26',
    location: 'ET 115',
    featured: false,
  },
  {
    id: 'm-sports-esports',
    title: 'Mastodon Esports Tryouts',
    club: 'PFW Esports',
    category: 'Sports',
    placeholderColor: PALETTE.dusk,
    aspectRatio: 0.75,
    date: 'Apr 27',
    location: 'Gates Sports Center',
  },
  {
    id: 'm-arts-jazz',
    title: 'Jazz Combo @ Rhinehart',
    club: 'School of Music',
    category: 'Arts',
    placeholderColor: PALETTE.goldDeep,
    aspectRatio: 1.33,
    date: 'Apr 29',
    location: 'Rhinehart Recital Hall',
  },
  {
    id: 'm-academic-library',
    title: 'Library After-Dark Study Jam',
    club: 'Helmke Library',
    category: 'Academic',
    placeholderColor: PALETTE.sky,
    aspectRatio: 0.8,
    date: 'May 01',
    location: 'Helmke 2F',
  },
  {
    id: 'm-food-coffee',
    title: 'Coffee & Code',
    club: 'PFW Coding Club',
    category: 'Food',
    placeholderColor: PALETTE.ivory,
    aspectRatio: 1.0,
    date: 'Apr 28',
    location: 'Starbucks Walb',
  },
  {
    id: 'm-clubs-greek',
    title: 'Greek Life Open House',
    club: 'Office of Student Organizations',
    category: 'Clubs',
    placeholderColor: PALETTE.goldSoft,
    aspectRatio: 0.75,
    date: 'May 02',
    location: 'Walb Ballroom',
  },
  {
    id: 'm-sports-dodgeball',
    title: 'Intramural Dodgeball',
    club: 'Rec Fit',
    category: 'Sports',
    placeholderColor: PALETTE.sage,
    aspectRatio: 1.33,
    date: 'Apr 30',
    location: 'Hilliard Gates Arena',
  },
  {
    id: 'm-food-trucks',
    title: 'Food Truck Rally',
    club: 'Mastodon Activities Council',
    category: 'Food',
    placeholderColor: PALETTE.terracotta,
    aspectRatio: 0.8,
    date: 'May 04',
    location: 'Lot R1',
  },
  {
    id: 'm-clubs-intl',
    title: 'International Fest',
    club: 'International Student Org',
    category: 'Clubs',
    placeholderColor: PALETTE.rose,
    aspectRatio: 1.0,
    date: 'May 05',
    location: 'Walb Student Union',
  },
  {
    id: 'm-academic-poster',
    title: 'Research Poster Night',
    club: 'Office of Research',
    category: 'Academic',
    placeholderColor: PALETTE.cream,
    aspectRatio: 0.75,
    date: 'May 06',
    location: 'Science Building Atrium',
  },
  {
    id: 'm-arts-market',
    title: 'Don Day Art Market',
    club: 'Student Artists Collective',
    category: 'Arts',
    placeholderColor: PALETTE.goldSoft,
    aspectRatio: 1.0,
    date: 'May 07',
    location: 'Quad Lawn',
  },
  {
    id: 'm-sports-bootcamp',
    title: 'Rec Fit Bootcamp',
    club: 'Rec Fit',
    category: 'Sports',
    placeholderColor: PALETTE.dusk,
    aspectRatio: 0.8,
    date: 'May 08',
    location: 'Gates Sports Center',
  },
  {
    id: 'm-academic-career',
    title: 'Career Lab: Résumé Review',
    club: 'Career Development',
    category: 'Academic',
    placeholderColor: PALETTE.sky,
    aspectRatio: 1.33,
    date: 'May 09',
    location: 'KT 109',
  },
  {
    id: 'm-clubs-mastodon-meetup',
    title: 'New Dons Meet & Greet',
    club: 'Mastodon Activities Council',
    category: 'Clubs',
    placeholderColor: PALETTE.goldDeep,
    aspectRatio: 0.75,
    date: 'May 10',
    location: 'Walb Plaza',
  },
];
