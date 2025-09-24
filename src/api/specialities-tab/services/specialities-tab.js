const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async getPublishedEntries(params = {}) {
    const { type } = params;

    const filters = {
      publishedAt: { $notNull: true }
    };

    if (type) {
      filters.type = type;
    }

    const entries = await strapi.entityService.findMany('api::specialities-tab.specialities-tab', {
      filters,
      sort: { createdAt: 'asc' },
      pagination: { limit: 8 },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
        },
      },
    });

    return entries;
  },
}));