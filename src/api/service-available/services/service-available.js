const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-available.service-available', ({ strapi }) => ({
  async getAllAvailableServices() {
    const services = await strapi.entityService.findMany('api::service-available.service-available', {
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

    return services;
  },
}));