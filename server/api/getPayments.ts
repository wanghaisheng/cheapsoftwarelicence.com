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

  const { userList } = await calculatePayments(session.user.email);

  return { users: userList };
});

const calculatePayments = async (email: any) => {
  const response = await stripe.checkout.sessions.list();
  const userList = response.data.filter(
    (item) =>
      item.client_reference_id === email && item.payment_status === "paid"
  );
  // const receivedCode = await db.select().from(productCodes).where(eq(productCodes.id, ));
  return { userList };
};
