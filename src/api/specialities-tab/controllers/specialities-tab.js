const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::specialities-tab.specialities-tab', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    // Ensure filters object
    if (!query.filters) {
      query.filters = {};
    }

    // Default sort
    if (!query.sort) {
      query.sort = { createdAt: 'asc' };
    }

    // Add limit based on type
    if (query.filters.type) {
      query.pagination = { ...query.pagination, limit: 8 };
    }

    const { data, meta } = await super.find.call(this, ctx);

    return { data, meta };
  },

  async create(ctx) {
    const { type } = ctx.request.body.data || {};

    // Check current count for the type
    if (type) {
      const count = await strapi
        .entityService
        .count('api::specialities-tab.specialities-tab', {
          filters: { type, publishedAt: { $notNull: true } }
        });

      if (count >= 8) {
        return ctx.badRequest(`Cannot create more than 8 entries for type: ${type}`);
      }
    }

    return await super.create.call(this, ctx);
  },

  async getPublishedEntries(ctx) {
    const { type } = ctx.query;

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

    return { data: entries };
  },
}));