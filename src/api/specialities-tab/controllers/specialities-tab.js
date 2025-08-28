const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    // Ensure filters object
    if (!query.filters) {
      query.filters = {};
    }

    // Default sort
    if (!query.sort) {
      query.sort = { createdAt: 'asc' };
    }

    // Call the core controller's find
    const { data, meta } = await super.find.call(this, ctx);

    return { data, meta };
  },

  async getPublishedEntries(ctx) {
    const entries = await strapi
      .service('api::specialities-tab.specialities-tab')
      .getPublishedEntries();

    return { data: entries };
  },
}));