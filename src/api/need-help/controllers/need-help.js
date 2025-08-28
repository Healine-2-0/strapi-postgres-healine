const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::need-help.need-help', ({ strapi }) => ({
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
      query.sort = { createdAt: 'asc' };
    }

    // Call the core controller's find
    const { data, meta } = await super.find.call(this, ctx);

    return { data, meta };
  },

  async getActiveEntries(ctx) {
    const entries = await strapi
      .service('api::need-help.need-help')
      .getAllActiveEntries();

    return { data: entries };
  },
}));