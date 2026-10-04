export interface CatalogueImage {
  id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
}

export interface CatalogueItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  price_unit: string;
  category: string;
  is_featured: boolean;
  visible: boolean;
  sort_order: number;
  images: CatalogueImage[];
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption?: string;
  category: string;
  visible: boolean;
  sort_order: number;
}

export interface VideoItem {
  id: string;
  title: string;
  youtube_id: string;
  description?: string;
  visible: boolean;
  sort_order: number;
}

export interface TestimonialItem {
  id: string;
  client_name: string;
  project_location?: string;
  quote: string;
  rating: number;
  visible: boolean;
  sort_order: number;
}

export interface SiteSettings {
  companyName: string;
  brandName: string;
  tagline: string;
  serviceAreas: string[];
  whatsappMessage: string;
  phone: string;
  phone_raw: string;
  whatsapp_number: string;
  email_primary: string;
  email_secondary: string;
  address: string;
  hours: string;
  youtube_url: string;
  whatsapp_catalogue_url: string;
  hero_headline: string;
  hero_subtext: string;
  about_story: string;
  [key: string]: any;
}
