import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    if (!query.filters) {
      query.filters = {};
    }

    // Only published ones
    query.filters.publishedAt = { $notNull: true };

    if (!query.sort) {
      query.sort = { id: 'asc' };
    }

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  async getActiveTabs(ctx) {
    const entries = await strapi
      .service('api::specialities-tab.specialities-tab')
      .getActiveTabs();

    return { data: entries };
  }
}));
