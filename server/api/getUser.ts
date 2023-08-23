import { user } from "./../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";

const fetchUsers = async (email: string) => {
  const userData = await db.select().from(user).where(eq(user.email, email));
  return userData;
};

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const data = await fetchUsers(email);

  return { data: data };
});
