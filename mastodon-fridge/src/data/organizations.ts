import { ImageSourcePropType } from 'react-native';

export interface Organization {
  id: string;
  name: string;
  pinColor: string;
  pinLogo?: ImageSourcePropType;
}

export const ORGANIZATIONS: Record<string, Organization> = {
  'student-life': {
    id: 'student-life',
    name: 'Student Life',
    pinColor: '#D9A074',
  },
  'visual-performing-arts': {
    id: 'visual-performing-arts',
    name: 'PFW College of Visual & Performing Arts',
    pinColor: '#D9A7A7',
  },
  'pfw-coding-club': {
    id: 'pfw-coding-club',
    name: 'PFW Coding Club',
    pinColor: '#3E3E3E',
  },
  'pfw-esports': {
    id: 'pfw-esports',
    name: 'PFW Esports',
    pinColor: '#6F7A89',
  },
  'school-of-music': {
    id: 'school-of-music',
    name: 'School of Music',
    pinColor: '#CFB991',
  },
  'helmke-library': {
    id: 'helmke-library',
    name: 'Helmke Library',
    pinColor: '#B9CCD6',
  },
  'student-orgs': {
    id: 'student-orgs',
    name: 'Office of Student Organizations',
    pinColor: '#F1D77A',
  },
  'rec-fitness': {
    id: 'rec-fitness',
    name: 'Rec Fit',
    pinColor: '#A7B89A',
  },
  'mastodon-activities': {
    id: 'mastodon-activities',
    name: 'Mastodon Activities Council',
    pinColor: '#E4DAC4',
  },
  'intl-students': {
    id: 'intl-students',
    name: 'International Student Org',
    pinColor: '#E76F51',
  },
  'office-of-research': {
    id: 'office-of-research',
    name: 'Office of Research',
    pinColor: '#EFE7D6',
  },
  'student-artists': {
    id: 'student-artists',
    name: 'Student Artists Collective',
    pinColor: '#F1D77A',
  },
  'career-development': {
    id: 'career-development',
    name: 'Career Development',
    pinColor: '#8FA9C4',
  },
};

export function getOrganization(id: string): Organization {
  return (
    ORGANIZATIONS[id] ?? {
      id,
      name: id,
      pinColor: '#CFB991',
    }
  );
}
