"use strict";

/**
 * order controller
 */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      //   console.log("ctx: ", ctx);

      const { products } = ctx.request.body;
      const line_items = await Promise.all(
        products.map(async (product) => {
          const real_product = await strapi.entityService.findOne("api::product.product", product.id, {
            fields: ["price"],
          });
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: product.title,
                images: [product.imgURL],
              },
              unit_amount: real_product.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );

      console.log("BEFORE session generation");
      
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_BASE_URL}/payments/success`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/payments/failed`,
      });
      
      console.log("AFTER session generation");
      await strapi.entityService.create("api::order.order", {
        data: {
          products: [
            {
              price: 45,
              quantity: 2,
            },
          ],
          stripeId: session.id,
        },
      });

      return { stripeId: session.id };
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
