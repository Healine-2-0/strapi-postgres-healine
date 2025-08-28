const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    if (!query.filters) {
      query.filters = {};
    }

    if (!query.filters.active) {
      query.filters.active = { $eq: true };
    }

    if (!query.sort) {
      query.sort = { order: 'asc' };
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },
}));
