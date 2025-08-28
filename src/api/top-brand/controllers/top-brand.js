const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top-brand.top-brand', ({ strapi }) => ({

  // Override find to only return active brands, sorted by "order"
  async find(ctx) {
    const { query } = ctx;

    if (!query.filters) {
      query.filters = {};
    }

    // Only active brands by default
    if (!query.filters.active) {
      query.filters.active = { $eq: true };
    }

    if (!query.sort) {
      query.sort = { order: 'asc' };
    }

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Custom endpoint: get only active brands with images
  async getActiveBrands(ctx) {
    const entries = await strapi
      .service('api::top-brand.top-brand')
      .getActiveBrands();
    return { data: entries };
  },

}));
