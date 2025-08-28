const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meds-demand.meds-demand', ({ strapi }) => ({
  async getAllMedsDemands() {
    const demands = await strapi.entityService.findMany('api::meds-demand.meds-demand', {
      filters: {
        publishedAt: { $notNull: true },
      },
      sort: { id: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
        },
      },
    });

    return demands;
  },
}));