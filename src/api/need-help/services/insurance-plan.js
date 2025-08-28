const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::need-help.need-help', ({ strapi }) => ({
  async getActiveItems() {
    const items = await strapi.entityService.findMany('api::need-help.need-help', {
      filters: {
        active: true,
        publishedAt: { $notNull: true }
      },
      sort: { id: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height']
        }
      }
    });

    return items;
  },
}));
