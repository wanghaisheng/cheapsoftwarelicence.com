import Stripe from "stripe";
import { getServerSession } from "#auth";
import { productCodes } from "../../drizzle/schema";
import db from "../../drizzle/db";

const stripe = new Stripe(process.env.STRIPE_TEST_KEY!, {
  apiVersion: "2022-11-15",
});

export default defineEventHandler(async (event) => {
  const {username, password} = getQuery(event)

  if (username !== "mark.teekens@outlook.com" && password !== process.env.PASSWORD_ORDERS) {
    throw createError({
      statusCode: 403,
      statusMessage: "no access",
    });
  }

  const { ordersData } = await calculatePayments();

  return ordersData 
});

const calculatePayments = async () => {
  const response = await stripe.checkout.sessions.list();
  const timestamp = new Date()
  const unixToday = timestamp.getTime() / 1000
  const thirtydays = 2592000

  const orders = response.data.filter(
    (item) =>
        item.payment_status === "paid" && item.created > unixToday - thirtydays
  );
  const orderIds = orders.map((order) => order.id)

  await db.delete(productCodes)

  for(let i = 0; i < orderIds.length; i++){
    await db
    .insert(productCodes)
    .values({order: orderIds[i]})
  }

  const ordersData = await db.select().from(productCodes)
  
  return { ordersData };
};
