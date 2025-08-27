import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::promo-banner.promo-banner', ({ strapi }) => ({
  async getBannersBySection(section: 'Doctor' | 'Hospital' | 'Pharmacy' | 'Service') {
    const banners = await strapi.entityService.findMany('api::promo-banner.promo-banner', {
      filters: {
        section: section,
        active: true,
        publishedAt: { $notNull: true }
      },
      sort: { order: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height']
        }
      }
    });
    
    return banners;
  },
  
  async getAllActiveBanners() {
    const banners = await strapi.entityService.findMany('api::promo-banner.promo-banner', {
      filters: {
        active: true,
        publishedAt: { $notNull: true }
      },
      sort: { order: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height']
        }
      }
    });
    
    return banners;
  }
}));
