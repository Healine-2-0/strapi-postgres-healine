const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::top-brand.top-brand', {
  config: {
    find: { policies: [], middlewares: [] },
    findOne: { policies: [], middlewares: [] },
    create: { policies: [], middlewares: [] },
    update: { policies: [], middlewares: [] },
    delete: { policies: [], middlewares: [] },
  },
});
