const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async getActiveTabs() {
    return await strapi.db.query('api::specialities-tab.specialities-tab').findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  },
}));
