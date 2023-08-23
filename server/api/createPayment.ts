import Stripe from "stripe";
import { getServerSession } from "#auth";

const stripe = new Stripe(process.env.STRIPE_TEST_KEY!, {
  apiVersion: "2022-11-15",
});

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session?.user?.email) {
    throw createError({
      statusCode: 403,
      statusMessage: "User is not authenticated, please sign in",
    });
  }
  const { email, allitems } = await readBody(event);
  const response = await createPayment(email, allitems);
  return { data: response };
});

const createPayment = async (email: string, allitems: number[]) => {
  const cartItemsAll = await $fetch("/api/getCartItems", {
    method: "POST",
    body: {
      cartItems: allitems,
    },
  });

  const allItems = cartItemsAll?.data.map((item) => {
    return item[0];
  });

  const items = [];
  for (let i = 0; i < allItems.length; i++) {
    items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: allItems[i].name,
        },
        unit_amount: allItems[i].price * 100,
      },
      quantity: 1,
    });
  }
  const response = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 4.5 * 100,
            currency: "eur",
          },
          display_name: "Estimated delivery",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 2,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
    ],
    mode: "payment",
    client_reference_id: email,
    customer_email: email,
    line_items: items,
    success_url: `https://cheapsoftwarelicence.com/success`,
    cancel_url: `https://cheapsoftwarelicence.com/cancel`,
  });
  return response.url;
};
