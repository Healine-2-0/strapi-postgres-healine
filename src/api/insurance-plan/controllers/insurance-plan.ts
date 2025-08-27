import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::insurance-plan.insurance-plan', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    if (!query.filters) {
      query.filters = {};
    }
    
    if (!(query.filters as any).active) {
      (query.filters as any).active = { $eq: true };
    }
    
    if (!query.sort) {
      query.sort = { order: 'asc' };
    }
    
    const { data, meta } = await super.find(ctx);
    
    return { data, meta };
  },
  
  async getActivePlans(ctx) {
    const entries = await strapi.service('api::insurance-plan.insurance-plan').getActivePlans();
    return { data: entries };
  },
  
  async getFeaturedPlans(ctx) {
    const entries = await strapi.service('api::insurance-plan.insurance-plan').getFeaturedPlans();
    return { data: entries };
  }
}));