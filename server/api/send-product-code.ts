import { productCodes } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";
import * as nodemailer from "nodemailer";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session?.user?.email) {
        throw createError({
          statusCode: 403,
          statusMessage: "User is not authenticated, please sign in",
        });
      }
   
    const {order, code, emailCustomer} = await readBody(event)
    checkProductCode(order, code, emailCustomer)
    console.log(emailCustomer)
    return true
})

const checkProductCode = async (order: string, code: string, email: string) => {
    await db.insert(productCodes).values({order: order, code: code, send: true});

    const transporter = nodemailer.createTransport({
        host: "mail.zxcs.nl",
        port: 465,
        secure: true,
        auth: {
          user: "mark@rubyfinance.nl", // generated ethereal user
          pass: "qwertyuio", // generated ethereal password
        },
      });
    
    
      await transporter.sendMail({
        from: "CHEAPSOFTWARELICENCE <mark@rubyfinance.nl>", // sender address
        to: email, // list of receivers
        subject: `Your product code`, // Subject line
        text: `${code} `, // plain text body
        html: `${code} `
      });
    
}