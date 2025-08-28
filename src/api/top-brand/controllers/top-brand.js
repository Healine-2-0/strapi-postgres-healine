const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::need-help.need-help', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    if (!query.filters) {
      query.filters = {};
    }

    if (!query.filters.active) {
      query.filters.active = { $eq: true };
    }

    if (!query.sort) {
      query.sort = { createdAt: 'asc' };
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  async getActiveHelps(ctx) {
    const entries = await strapi.service('api::need-help.need-help').getActiveHelps();
    return { data: entries };
  },
}));
