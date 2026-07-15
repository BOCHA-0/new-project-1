export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  hero_image: string;
  images: string[];
  video_url?: string;
  prototype_url?: string;
  live_url?: string;
  case_study: CaseStudy;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  research: string;
  user_journey: string;
  wireframes: string[];
  design_system: DesignSystem;
  results: string;
  duration: string;
  role: string;
  tools: string[];
}

export interface DesignSystem {
  colors: { name: string; hex: string }[];
  typography: { name: string; usage: string }[];
  components: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  enabled: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  logo?: string;
  achievements: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  availability: string;
  resume_url?: string;
  logo_url?: string;
  favicon_url?: string;
  social_links: SocialLinks;
  seo: SEOSettings;
  sections_order: string[];
  sections_enabled: Record<string, boolean>;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  dribbble?: string;
  behance?: string;
  instagram?: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  og_image?: string;
}
