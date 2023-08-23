// file: ~/server/api/auth/[...].ts
//@ts-ignore
import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

export default NuxtAuthHandler({
  secret: "2389u234jfn49i38rh234n28734rhngf93e8u19ew12bn80dyghb23",
  session: {
    strategy: "jwt",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      async authorize(credentials: any, req: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await $fetch("/api/getUser", {
          method: "POST",
          body: {
            email: email,
          },
        });

        const passwordDb = user.data[0].password?.toString();

        const hashed = await bcrypt.compare(password, passwordDb as string);

        if (hashed) {
          return user.data[0];
        } else {
          // wrong password
          throw createError({
            statusCode: 404,
            statusMessage: "Password is incorrect",
          });
        }
      },
    }),
  ],
});
