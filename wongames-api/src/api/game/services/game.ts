import axios from "axios";
import { JSDOM } from "jsdom";
import slugify from "slugify";
import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::game.game", () => ({
    async getGameInfo(slug) {
    const gogSlug = slug.replaceAll('-', '_').toLowerCase();

    const body = await axios.get(`https://www.gog.com/game/${gogSlug}`);
    const dom = new JSDOM(body.data);

    const raw_description = dom.window.document.querySelector(".description");

    const description = raw_description.innerHTML
    const short_description = raw_description.textContent.slice(0,160);

    const ratingElement = dom.window.document.querySelector(".age-restrictions__icon use");

    return {
        description,
        short_description,
        rating: ratingElement ? ratingElement
        .getAttribute('xlink:href')
        .replace(/_/g, " ")
        .replace("#", " ") 
        : "BR0",
    }
  },

  async populate() {
    const gogApiUrl = `https://catalog.gog.com/v1/catalog?limit=48&order=desc%3Atrending`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    const developers = Array.isArray(products[2].developers) ? products[2].developers : [products[2].developers];

    developers.map(async (developer) => {
        await strapi.service("api::developer.developer").create({
          data: {
            name: developer,
            slug: slugify(developer, { strict: true, lower: true }),
          },
        });
    });

    const publishers = Array.isArray(products[2].publishers) ? products[2].publishers : [products[2].publishers];
    
    publishers.map(async (publisher) => {
        await strapi.service("api::publisher.publisher").create({
          data: {
            name: publisher,
            slug: slugify(publisher, { strict: true, lower: true }),
          },
        });
    });

    // console.log(await this.getGameInfo(products[2].slug));
  },
}));
