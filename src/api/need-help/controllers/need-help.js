const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::need-help.need-help', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    // Ensure filters object exists
    query.filters = query.filters || {};

    // Default filter: only active items
    if (query.filters.active === undefined) {
      query.filters.active = { $eq: true };
    }

    // Default sort by id ascending
    query.sort = query.sort || { id: 'asc' };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  async getActiveItems(ctx) {
    const entries = await strapi
      .service('api::need-help.need-help')
      .getActiveItems();

    return { data: entries };
  },
}));
