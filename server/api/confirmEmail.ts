import { emailconfirmation } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { generateTemplate } from "../../utils/template";

const confirmEmail = async (
  name?: string,
  email?: string,
  password?: string,
  code?: string
) => {

  const user = await $fetch("/api/getUser", {
    method: "POST",
    body: { email: email },
  });
  
  if (user.data[0]) {
    throw createError({
      statusCode: 404,
      statusMessage: "User does already exists",
    });
  } else {
    if (code) {
      await checkCode(name, code, email, password);
    } else {
      await sendEmail(name, email, password);
    }
  }
};

export default defineEventHandler(async (event) => {
  const { name, email, password, code } = await readBody(event);
  const data = await confirmEmail(name, email, password, code);

  return { data: data };
});

const sendEmail = async (name?: string, email?: string, password?: string) => {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password as string, salt);

  const code = Math.floor(1000 + Math.random() * 9000).toString();

  await db.insert(emailconfirmation).values({
    name: name,
    email: email,
    password: hashed,
    confirmed: false,
    code: code,
  });

  const transporter = nodemailer.createTransport({
    host: "mail.zxcs.nl",
    port: 465,
    secure: true,
    auth: {
      user: "mark@rubyfinance.nl", // generated ethereal user
      pass: "qwertyuio", // generated ethereal password
    },
  });

  const BASE_URI = process.env.AUTH_ORIGIN;

  await transporter.sendMail({
    from: "VETA NETWORK <mark@rubyfinance.nl>", // sender address
    to: email, // list of receivers
    subject: `Your code is [${code}]`, // Subject line
    text: `${code} `, // plain text body
    html: generateTemplate(BASE_URI as string, code, email as string), // html body
  });
};

const checkCode = async (
  name?: string,
  code?: string,
  email?: string,
  password?: string
) => {
  // handle the logic to check the code in the database

  const userData = await db
  .select()
  .from(emailconfirmation)
  .where(eq(emailconfirmation.email, email as string));
const passwordDb = userData[0].password?.toString();

const isValid = await bcrypt.compare(
  password as string,
  passwordDb as string
);

if (!isValid) {
  throw createError({
    statusCode: 404,
    statusMessage: "Password is incorrect",
  });
}

  await db
    .update(emailconfirmation)
    .set({ confirmed: true })
    .where(
      and(
        eq(emailconfirmation.code, code as string),
        eq(emailconfirmation.email, email as string),
      )
    );

  const user = await db
    .select()
    .from(emailconfirmation)
    .where(
      and(
        eq(emailconfirmation.code, code as string),
        eq(emailconfirmation.email, email as string),
        eq(emailconfirmation.confirmed, true)
      )
    );
  if (!user[0]) {
    throw createError({
      statusCode: 404,
      statusMessage: "Code was not correct",
    });
  } else {
    await $fetch("/api/createUser", {
      method: "POST",
      body: {
        name: user[0]?.name,
        email: user[0]?.email,
        password: password,
      },
    });
  }
};
