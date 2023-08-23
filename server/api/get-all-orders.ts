import Stripe from "stripe";
import { getServerSession } from "#auth";
import { productCodes } from "../../drizzle/schema";
import db from "../../drizzle/db";

const stripe = new Stripe(process.env.STRIPE_TEST_KEY!, {
  apiVersion: "2022-11-15",
});

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);

  const { orders } = await calculatePayments();

  return orders 
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
  

  
  
  return { orders };
};
