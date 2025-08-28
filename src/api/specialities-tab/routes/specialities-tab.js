const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::specialities-tab.specialities-tab', {
  config: {
    find: { policies: [], middlewares: [] },
    findOne: { policies: [], middlewares: [] },
    create: { policies: [], middlewares: [] },
    update: { policies: [], middlewares: [] },
    delete: { policies: [], middlewares: [] },
  },
});