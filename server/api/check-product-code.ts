import { productCodes } from "../../drizzle/schema";
import db from "../../drizzle/db";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const {id} = await readBody(event)
    const isSend = await checkProductCode(id)
    return isSend
})

const checkProductCode = async (id: string) => {
    const productCode = await db.select().from(productCodes).where(and(eq(productCodes.order, id), eq(productCodes.send, true)));
    if(!productCode[0]){
        return false
    }else{
        return true
    }
}