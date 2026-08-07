import { MetadataRoute } from 'next';
import { services } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theeternalstudio.com';

  const staticRoutes = [
    '',
    '/about',
    '/our-story',
    '/portfolio',
    '/testimonials',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
