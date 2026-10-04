import { siteSettings } from '../lib/content';
import { SiteSettings } from '../types';

export function useSiteSettings(): { settings: SiteSettings } {
  return { settings: siteSettings };
}
