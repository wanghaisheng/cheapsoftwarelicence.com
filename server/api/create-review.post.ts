
import db from "~/drizzle/db";
import { reviews } from "~/drizzle/schema";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session?.user?.email) {
    throw createError({
      statusMessage: "could not been authenticated",
      statusCode: 403,
    });
  }
  const { productid, name, stars, review } = await readBody(event);

  await createReview(productid, name, stars, review);
  return `succesfully created review for id: ${productid ?? 0}`;
});

const createReview = async (
  productid: number,
  name: string,
  stars: number,
  review: string
): Promise<void> => {
  await db
    .insert(reviews)
    .values({ productid: productid, name: name, stars: stars, review: review });
};
