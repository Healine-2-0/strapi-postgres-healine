import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async getActiveTabs() {
    const tabs = await strapi.entityService.findMany('api::specialities-tab.specialities-tab', {
      filters: {
        publishedAt: { $notNull: true }
      },
      sort: { id: 'asc' },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'caption', 'width', 'height']
        }
      }
    });

    return tabs;
  }
}));
