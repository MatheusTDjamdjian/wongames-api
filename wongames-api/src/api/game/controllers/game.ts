/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::game.game",
  ({ strapi }) => ({
    async populate(ctx) {
      const limit = Number(ctx.query.limit) || 100;
      const offset = Number(ctx.query.offset) || 0;

      const options = { limit, offset };

      await strapi.service("api::game.game").populate(options);

      ctx.send("Finished populating games!");
    },
  })
);