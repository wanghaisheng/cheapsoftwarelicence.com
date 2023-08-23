import { products } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq } from "drizzle-orm";

// Define the function to fetch cart items
const fetchCartItems = async (cartItems: any) => {
  const promises = cartItems.map((itemId: any) =>
    db.select().from(products).where(eq(products.id, itemId))
  );

  const allCartItems = await Promise.all(promises);

  return allCartItems;
};
export default defineEventHandler(async (event) => {
  const { cartItems } = await readBody(event);

  try {
    const allCartItems = await fetchCartItems(cartItems);

    return { data: allCartItems };
  } catch (error) {
    return new Error(
      "Oops, failed to get the data, please check your internet connection."
    );
  }
});
