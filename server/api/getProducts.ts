import { softwareProducts } from "../../drizzle/schema";
import db from "../../drizzle/db";

const fetchProducts = async () => {
  const product = await db.select().from(softwareProducts);
  return product;
};

export default defineEventHandler(async (event) => {
  const product = await fetchProducts();

  return { data: product };
});
