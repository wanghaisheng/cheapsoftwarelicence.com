import { emailReferences, user } from "./../../drizzle/schema";
import db from "../../drizzle/db";
import * as nodemailer from "nodemailer";
import { generateTemplateReference } from "../../utils/templateReference";

const createReference = async (email: string) => {
  await db.insert(emailReferences).values({ email: email });

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
  const code = "DADDY10";

  await transporter.sendMail({
    from: "BABACHOULZ <mark@rubyfinance.nl>", // sender address
    to: email, // list of receivers
    subject: `Your 10% offer code is ' ${code} '`, // Subject line
    text: `${code} `, // plain text body
    html: generateTemplateReference(code, email as string), // html body
  });
};

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  const data = await createReference(email);

  return { data: data };
});
