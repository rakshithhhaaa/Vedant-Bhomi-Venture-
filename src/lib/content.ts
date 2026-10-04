import settingsData from '../data/settings.json';
import catalogueData from '../data/catalogue.json';
import videosData from '../data/videos.json';
import galleryData from '../data/gallery.json';
import testimonialsData from '../data/testimonials.json';

import { SiteSettings, CatalogueItem, VideoItem, GalleryImage, TestimonialItem } from '../types';

export const siteSettings: SiteSettings = settingsData as SiteSettings;
export const catalogueItems: CatalogueItem[] = (catalogueData as CatalogueItem[]).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
export const videos: VideoItem[] = (videosData as VideoItem[]).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
export const galleryImages: GalleryImage[] = (galleryData as GalleryImage[]).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
export const testimonials: TestimonialItem[] = (testimonialsData as TestimonialItem[]).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

export function getVisibleCatalogueItems(): CatalogueItem[] {
  return catalogueItems.filter((item) => item.visible);
}

export function getFeaturedCatalogueItems(): CatalogueItem[] {
  return catalogueItems.filter((item) => item.visible && item.is_featured);
}

export function getCatalogueItemBySlug(slug: string): CatalogueItem | undefined {
  return catalogueItems.find((item) => item.slug === slug || item.id === slug);
}

export function getVisibleVideos(): VideoItem[] {
  return videos.filter((v) => v.visible);
}

export function getVisibleGalleryImages(): GalleryImage[] {
  return galleryImages.filter((img) => img.visible);
}

export function getVisibleTestimonials(): TestimonialItem[] {
  return testimonials.filter((t) => t.visible);
}

export function formatServiceAreas(areas?: string[]): string {
  if (!areas || areas.length === 0) {
    return 'Serving Bangalore, Karnataka, Tamil Nadu and Andhra Pradesh';
  }
  if (areas.length === 1) return `Serving ${areas[0]}`;
  if (areas.length === 2) return `Serving ${areas[0]} and ${areas[1]}`;
  const last = areas[areas.length - 1];
  const rest = areas.slice(0, -1).join(', ');
  return `Serving ${rest} and ${last}`;
}

export function formatBuildAcross(areas?: string[]): string {
  if (!areas || areas.length === 0) {
    return 'Bangalore, Karnataka, Tamil Nadu and Andhra Pradesh';
  }
  if (areas.length === 1) return areas[0];
  if (areas.length === 2) return `${areas[0]} and ${areas[1]}`;
  const last = areas[areas.length - 1];
  const rest = areas.slice(0, -1).join(', ');
  return `${rest} and ${last}`;
}
