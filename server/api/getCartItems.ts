import { products } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq } from "drizzle-orm";

interface CartItems {
  randomId: string;
  id: string
}

// Define the function to fetch cart items
const fetchCartItems = async (cartItems: CartItems[]) => {
  let loopItems = []
  for (let i = 0; i < cartItems.length; i++) {
    loopItems.push({ ...(await db.select().from(products).where(eq(products.id, Number(cartItems[i].id)))).at(0), uuid: cartItems[i].randomId })
  }
  return loopItems;
};
export default defineEventHandler(async (event) => {
  const { cartItems } = await readBody(event);

  try {
    const allCartItems = await fetchCartItems(cartItems as CartItems[]);

    return { products: allCartItems };
  } catch (error) {
    return new Error(
      "Oops, failed to get the data, please check your internet connection."
    );
  }
});
