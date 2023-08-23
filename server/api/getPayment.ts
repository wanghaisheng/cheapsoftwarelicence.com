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
  const { orderId, referenceId } = await readBody(event);
  const response = await calculatePayment(orderId);

  if (response.client_reference_id === referenceId._value) {
    return { payment: response };
  } else {
    return { payment: false };
  }
});

const calculatePayment = async (orderId: string) => {
  const response = await stripe.checkout.sessions.retrieve(orderId, {
    expand: ["line_items"],
  });
  return response;
};
