const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top-brand.top-brand', ({ strapi }) => ({

  async getActiveBrands() {
    return await strapi.entityService.findMany('api::top-brand.top-brand', {
      filters: {
        active: true,
        publishedAt: { $notNull: true },
      },
      sort: { order: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
        },
      },
    });
  },

}));
