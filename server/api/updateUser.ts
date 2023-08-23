import { user } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "#auth";

const updateUser = async (
  email: string,
  zipcode: string,
  street: string,
  number: string,
  country: string
) => {
  const isAlreadyInDb = await db
    .select()
    .from(user)
    .where(eq(user.email, email));

  if (isAlreadyInDb) {
    await db
      .update(user)
      .set({
        zipcode: zipcode,
        street: street,
        number: number,
        country: country,
      })
      .where(eq(user.email, email));
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "User is not found in the database",
    });
  }
};

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session?.user?.email) {
    throw createError({
      statusCode: 403,
      statusMessage: "User is not authenticated, please sign in",
    });
  }
  const { email, zipcode, street, number, country } = await readBody(event);
  try {
    await updateUser(email, zipcode, street, number, country);
  } catch (error) {}

  return { data: true };
});
