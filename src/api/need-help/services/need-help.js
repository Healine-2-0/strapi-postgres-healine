const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::need-help.need-help', ({ strapi }) => ({
  async getAllActiveEntries() {
    const entries = await strapi.entityService.findMany('api::need-help.need-help', {
      filters: {
        active: true,
        publishedAt: { $notNull: true },
      },
      sort: { createdAt: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
        },
      },
    });

    return entries;
  },
}));