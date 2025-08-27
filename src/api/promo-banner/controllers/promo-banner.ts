import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::promo-banner.promo-banner', ({ strapi }) => ({
  async find(ctx) {
    // Get the base query
    const { query } = ctx;
    
    // Add default filters if not provided
    if (!query.filters) {
      query.filters = {};
    }
    
    // Add default active filter if not provided
    if (!(query.filters as any).active) {
      (query.filters as any).active = { $eq: true };
    }
    
    // Add default sorting by order if not provided
    if (!query.sort) {
      query.sort = { order: 'asc' };
    }
    
    // Call the default find method
    const { data, meta } = await super.find(ctx);
    
    return { data, meta };
  },
  
  async findBySection(ctx) {
    const { section } = ctx.params;
    
    const entries = await strapi.service('api::promo-banner.promo-banner').getBannersBySection(section as 'Doctor' | 'Hospital' | 'Pharmacy' | 'Service');
    
    return { data: entries };
  },
  
  async getActiveBanners(ctx) {
    const entries = await strapi.service('api::promo-banner.promo-banner').getAllActiveBanners();
    
    return { data: entries };
  }
}));
