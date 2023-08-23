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
  const { email } = await readBody(event);

  const { userList, response } = await calculatePayments(email);

  return { users: userList, response: response.data };
});

const calculatePayments = async (email: any) => {
  const response = await stripe.checkout.sessions.list();
  const userList = response.data.filter(
    (item) =>
      item.client_reference_id === email && item.payment_status === "paid"
  );
  return { userList, response };
};
