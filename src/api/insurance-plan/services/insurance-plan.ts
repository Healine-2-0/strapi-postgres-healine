import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::insurance-plan.insurance-plan', ({ strapi }) => ({
  async getActivePlans() {
    const plans = await strapi.entityService.findMany('api::insurance-plan.insurance-plan', {
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
    
    return plans;
  },
  
  async getFeaturedPlans() {
    const plans = await strapi.entityService.findMany('api::insurance-plan.insurance-plan', {
      filters: {
        active: true,
        isFeatured: true,
        publishedAt: { $notNull: true }
      },
      sort: { order: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height']
        }
      }
    });
    
    return plans;
  }
}));