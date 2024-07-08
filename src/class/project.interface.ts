import type { IconNames } from '../components/IconVector.vue'

export interface Project {
  title: string;
  icon: string;
  cover: string;
  description: string;
  year: number;
  platform: string;
  type: string;
  creator: string;
  source: string;
  demo: string;
  tags: string;
  techs: string;
  content?: string;
  content_link?: string;
}

export interface SocialLink {
  name: string;
  icon: IconNames;
  url: string;
}

export interface PortfolioData {
  title: string;
  title_page: string;
  name: string;
  bio: string;
  cover: string;
  avatar: string;
  socials: SocialLink[];
  projects: Project[];
}