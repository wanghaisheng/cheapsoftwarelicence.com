import { user } from "./../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";
import * as bcrypt from "bcrypt";
const checkCredentials = async (email: string, password: string) => {
  const userData = await db
    .select()
    .from(user)
    .where(and(eq(user.email, email)));
  const passwordDb = userData[0].password?.toString();

  const isValid = await bcrypt.compare(
    password as string,
    passwordDb as string
  );

  if (isValid) {
    return true;
  } else {
    return false;
  }
};

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const data = await checkCredentials(email, password);

  return { data: data };
});
