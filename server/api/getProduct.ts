import { softwareProducts } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";

const fetchProduct = async (id: number) => {
  const product = await db.select().from(softwareProducts).where(eq(softwareProducts.id, id));
  return product[0];
};

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const product = await fetchProduct(id);

  return { data: product };
});
