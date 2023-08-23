import { user } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";
import * as bcrypt from "bcrypt";

const createUser = async (
  name: string,
  email: string,
  password: string,
  zipcode: string,
  street: string,
  number: string,
  country: string
) => {
  const isAlreadyInDb = await db
    .select()
    .from(user)
    .where(eq(user.email, email));

  if (isAlreadyInDb.length === 0) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    await db.insert(user).values({
      name: name,
      email: email,
      password: hashed,
      zipcode: zipcode,
      street: street,
      number: number,
      country: country,
    });
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "User is already found",
    });
  }
};

export default defineEventHandler(async (event) => {
  const { name, email, password, zipcode, street, number, country } =
    await readBody(event);
  try {
    await createUser(name, email, password, zipcode, street, number, country);
  } catch (error) {}

  return { data: true };
});
