const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::service-available.service-available', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    // Ensure filters object
    if (!query.filters) {
      query.filters = {};
    }

    // Filter for published entries (since draftAndPublish is true)
    if (!query.filters.publishedAt) {
      query.filters.publishedAt = { $notNull: true };
    }

    // Default sort (using id as fallback since no order attribute)
    if (!query.sort) {
      query.sort = { id: 'asc' };
    }

    // Call the core controller's find
    const { data, meta } = await super.find.call(this, ctx);

    return { data, meta };
  },

  async getAllAvailableServices(ctx) {
    const entries = await strapi
      .service('api::service-available.service-available')
      .getAllAvailableServices();

    return { data: entries };
  },
}));