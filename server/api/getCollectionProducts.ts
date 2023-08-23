import { products } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq } from "drizzle-orm";

const fetchCollectionProducts = async (collection: string) => {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.collection, collection));
  return product;
};

export default defineEventHandler(async (event) => {
  const { collection } = await readBody(event);
  const product = await fetchCollectionProducts(collection);

  return { data: product };
});
