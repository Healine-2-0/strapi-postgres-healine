const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promo-banner.promo-banner', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    // Ensure filters object
    if (!query.filters) {
      query.filters = {};
    }

    // Add default active filter
    if (!query.filters.active) {
      query.filters.active = { $eq: true };
    }

    // Default sort
    if (!query.sort) {
      query.sort = { order: 'asc' };
    }

    // Call the core controller's find
    const { data, meta } = await super.find.call(this, ctx);

    return { data, meta };
  },

  async findBySection(ctx) {
    const { section } = ctx.params;

    const entries = await strapi
      .service('api::promo-banner.promo-banner')
      .getBannersBySection(section);

    return { data: entries };
  },

  async getActiveBanners(ctx) {
    const entries = await strapi
      .service('api::promo-banner.promo-banner')
      .getAllActiveBanners();

    return { data: entries };
  }
}));
